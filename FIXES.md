# Fixes

## 1. Revenue from another tenant appears after a refresh (Client B)

- **Symptom:** Ocean Rentals sometimes saw another company's revenue after refreshing the page.
- **How found:** Traced `/dashboard/summary` → `cache.get_revenue_summary`. The seed data has `prop-001` under both `tenant-a` and `tenant-b`.
- **Root cause:** The Redis key was `revenue:{property_id}`. Whichever tenant loaded a property first had its total served to the other tenant for the 5-minute TTL.
- **Fix:** The key is now `revenue:{tenant_id}:{property_id}:{period}`. File: `backend/app/services/cache.py`.
- **Verify:** Log in as A, then as B, and request `prop-001` for each. B gets `0.0` / count 0, not A's total. `redis-cli KEYS 'revenue:*'` shows separate `tenant-a` and `tenant-b` keys.

## 2. Mock fallback serves another tenant's figures (Client B)

- **Symptom:** The same leak as #1. It happened "sometimes" because it only triggered when the DB call failed.
- **How found:** Read the `except` branch of `calculate_total_revenue`. Its hard-coded totals look up by `property_id` only and ignore the tenant. They are Sunset's real March numbers (`prop-002` = 4975.50, `prop-003` = 6100.50). The result was also cached under the caller's key.
- **Root cause:** On any DB error, the code silently returned data that does not depend on the tenant.
- **Fix:** Log and re-raise instead. The request fails and nothing is cached. File: `backend/app/services/reservations.py`.
- **Verify:** Stop the `db` container and request `prop-002` as B. The response is a 500, not `4975.5`, and `redis-cli KEYS 'revenue:*'` is empty.

## 3. The DB query never ran, so every total was mock data (Client A)

- **Symptom:** Sunset's totals did not match their records. For example, `prop-001` showed 1000.00 when the March total is 2250.00.
- **How found:** After #2 removed the fallback, every request returned 500. The backend log showed `ImportError: ... requires that the Python 'greenlet' library is installed`. The pool code also had separate problems.
- **Root cause:**
  - `QueuePool` cannot be used with an async engine.
  - The DB URL was built from `supabase_*` settings instead of `DATABASE_URL`.
  - A new pool was created on every request.
  - `get_session` was `async def` but was used as `async with`.
  - `greenlet` was missing.

  Any one of these sends the request into the mock fallback.
- **Fix:** Use `DATABASE_URL` with asyncpg and the default async pool. Use a single shared `db_pool`. Make `get_session` synchronous. Add `greenlet`. Files: `backend/app/core/database_pool.py`, `backend/app/services/reservations.py`, `backend/requirements.txt`.
- **Verify:** Rebuild the backend image (`docker compose up --build backend`). Then `GET /api/v1/dashboard/summary?property_id=prop-001` as A returns `2250.0`, count 4.

## 4. March totals ignore each property's time zone (Client A)

- **Symptom:** Sunset's March revenue does not match their records.
- **How found:** In the seed data, `res-tz-1` checks in at `2024-02-29 23:30 UTC`. In Europe/Paris that is 1 March 00:30, so it is a March booking. The endpoint also had no month filter at all.
- **Root cause:** There was no month filtering. A UTC month boundary would assign `res-tz-1` to February.
- **Fix:** Added optional `month` and `year` parameters. The query compares `check_in_date AT TIME ZONE p.timezone` against the local month boundaries, joining `properties` on `(id, tenant_id)`. The period is part of the cache key. The UI has a month picker.
  - Backend: `backend/app/api/v1/dashboard.py`, `backend/app/services/reservations.py`, `backend/app/services/cache.py`
  - Frontend: `frontend/src/components/Dashboard.tsx`, `frontend/src/components/RevenueSummary.tsx`, `frontend/src/lib/secureApi.ts`
- **Verify:**
  - `?property_id=prop-001&month=3&year=2024` as A returns `2250.0`, count 4 (this includes `res-tz-1`).
  - `month=2` returns `0.0`.
  - `prop-005`, March, as B returns `3256.0`, count 3.

## 5. Totals off by a few cents (Finance)

- **Symptom:** Some totals were off by one cent.
- **How found:** `total_amount` is `NUMERIC(10,3)`, so it holds sub-cent values. `dashboard.py` sent the unrounded sum as a `float`, and `RevenueSummary.tsx` rounded it with `Math.round(x * 100) / 100`. Binary floats get half-cent values wrong: in Node, `Math.round(1.005 * 100) / 100` gives `1`, while Decimal half-up gives `1.01`.
- **Root cause:** Rounding to cents happened on a binary float in the browser instead of on the exact `Decimal` sum.
- **Fix:** Round the `Decimal` sum to `0.01` with `ROUND_HALF_UP` before converting to float. The browser's rounding then has nothing left to change. File: `backend/app/api/v1/dashboard.py`.
- **Verify:** Every `total_revenue` in the API has at most 2 decimal places. To test a half-cent case, use B's `prop-001`, which has no reservations. Run `INSERT INTO reservations (id, property_id, tenant_id, check_in_date, check_out_date, total_amount) VALUES ('res-half','prop-001','tenant-b','2024-03-15 12:00+00','2024-03-16 10:00+00',1.005);`, flush Redis, and request `prop-001` March as B. Expect `1.01`; before the fix the UI showed `1.00`. Delete the row afterwards.

## Open (not fixed)

- **Currency:** Every row is labelled `USD` whatever its real currency.
- **Property list:** The dropdown in `Dashboard.tsx` is hard-coded with Sunset's property names. Ocean sees their own numbers under Sunset's names. Fixing this needs a per-tenant properties endpoint.

## How to run the checks

```bash
docker compose up --build -d
TOKEN=$(curl -s -X POST localhost:8000/api/v1/auth/login -H 'Content-Type: application/json' \
  -d '{"email":"ocean@propertyflow.com","password":"client_b_2024"}' | jq -r .access_token)
curl -s "localhost:8000/api/v1/dashboard/summary?property_id=prop-004&month=3&year=2024" \
  -H "Authorization: Bearer $TOKEN"   # expect 1776.5, count 4
```

from datetime import datetime
from decimal import Decimal
from typing import Dict, Any, List, Optional

async def calculate_monthly_revenue(property_id: str, month: int, year: int, db_session=None) -> Decimal:
    """
    Calculates revenue for a specific month.
    """

    start_date = datetime(year, month, 1)
    if month < 12:
        end_date = datetime(year, month + 1, 1)
    else:
        end_date = datetime(year + 1, 1, 1)
        
    print(f"DEBUG: Querying revenue for {property_id} from {start_date} to {end_date}")

    # SQL Simulation (This would be executed against the actual DB)
    query = """
        SELECT SUM(total_amount) as total
        FROM reservations
        WHERE property_id = $1
        AND tenant_id = $2
        AND check_in_date >= $3
        AND check_in_date < $4
    """
    
    # In production this query executes against a database session.
    # result = await db.fetch_val(query, property_id, tenant_id, start_date, end_date)
    # return result or Decimal('0')
    
    return Decimal('0') # Placeholder for now until DB connection is finalized

async def calculate_total_revenue(property_id: str, tenant_id: str, month: Optional[int] = None, year: Optional[int] = None) -> Dict[str, Any]:
    """
    Aggregates revenue from database.
    If month and year are given, only reservations checking in during that month
    (in the property's own local time zone) are included.
    """
    try:
        # Use the shared database pool (initialize once, not per request)
        from app.core.database_pool import db_pool

        if not db_pool.session_factory:
            await db_pool.initialize()

        if db_pool.session_factory:
            async with db_pool.get_session() as session:
                # Use SQLAlchemy text for raw SQL
                from sqlalchemy import text

                params = {
                    "property_id": property_id,
                    "tenant_id": tenant_id
                }

                # Month boundaries are local dates, compared against the check-in
                # converted to the property's time zone (e.g. Europe/Paris).
                month_filter = ""
                if month and year:
                    params["start_date"] = datetime(year, month, 1)
                    params["end_date"] = datetime(year + 1, 1, 1) if month == 12 else datetime(year, month + 1, 1)
                    month_filter = """
                    AND (r.check_in_date AT TIME ZONE p.timezone) >= :start_date
                    AND (r.check_in_date AT TIME ZONE p.timezone) < :end_date
                    """

                query = text(f"""
                    SELECT
                        r.property_id,
                        SUM(r.total_amount) as total_revenue,
                        COUNT(*) as reservation_count
                    FROM reservations r
                    JOIN properties p ON p.id = r.property_id AND p.tenant_id = r.tenant_id
                    WHERE r.property_id = :property_id AND r.tenant_id = :tenant_id
                    {month_filter}
                    GROUP BY r.property_id
                """)

                result = await session.execute(query, params)
                row = result.fetchone()
                
                if row:
                    total_revenue = Decimal(str(row.total_revenue))
                    return {
                        "property_id": property_id,
                        "tenant_id": tenant_id,
                        "total": str(total_revenue),
                        "currency": "USD", 
                        "count": row.reservation_count
                    }
                else:
                    # No reservations found for this property
                    return {
                        "property_id": property_id,
                        "tenant_id": tenant_id,
                        "total": "0.00",
                        "currency": "USD",
                        "count": 0
                    }
        else:
            raise Exception("Database pool not available")
            
    except Exception as e:
        print(f"Database error for {property_id} (tenant: {tenant_id}): {e}")
        # Do not fall back to tenant-agnostic mock figures: they belong to other
        # tenants and would be cached under this tenant's key. Fail instead.
        raise

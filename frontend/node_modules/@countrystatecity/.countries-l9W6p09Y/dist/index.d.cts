/**
 * TypeScript interfaces for @world/countries package
 */
/**
 * Timezone information for a country
 */
interface ITimezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}
/**
 * Translations for country/state/city names
 */
interface ITranslations {
    [languageCode: string]: string;
}
/**
 * Basic country information (lightweight)
 * Used in countries.json for fast loading
 */
interface ICountry {
    id: number;
    name: string;
    iso2: string;
    iso3: string;
    numeric_code: string;
    phonecode: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    subregion: string;
    nationality: string;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
}
/**
 * Full country metadata including timezones and translations
 * Used in {Country-CODE}/meta.json
 */
interface ICountryMeta extends ICountry {
    timezones: ITimezone[];
    translations: ITranslations;
}
/**
 * State/Province information
 */
interface IState {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    fips_code: string | null;
    iso2: string;
    type: string | null;
    latitude: string | null;
    longitude: string | null;
    native: string | null;
    timezone: string | null;
    translations: ITranslations;
}
/**
 * City information
 */
interface ICity {
    id: number;
    name: string;
    state_id: number;
    state_code: string;
    country_id: number;
    country_code: string;
    latitude: string;
    longitude: string;
    native: string | null;
    timezone: string | null;
    translations: ITranslations;
}

/**
 * Dynamic data loaders for @world/countries
 * Uses dynamic import() to enable code-splitting and lazy loading
 * Falls back to fs.readFileSync for CommonJS environments
 */

/**
 * Get lightweight list of all countries
 * @returns Promise with array of countries (basic info only)
 * @bundle ~5KB - Loads countries.json
 */
declare function getCountries(): Promise<ICountry[]>;
/**
 * Get full country metadata including timezones and translations
 * @param countryCode - ISO2 country code (e.g., 'US', 'IN')
 * @returns Promise with full country metadata or null if not found
 * @bundle ~5KB per country - Loads {Country-CODE}/meta.json
 */
declare function getCountryByCode(countryCode: string): Promise<ICountryMeta | null>;
/**
 * Get all states/provinces for a specific country
 * @param countryCode - ISO2 country code
 * @returns Promise with array of states or empty array if not found
 * @bundle ~10-100KB depending on country - Loads {Country-CODE}/states.json
 */
declare function getStatesOfCountry(countryCode: string): Promise<IState[]>;
/**
 * Get specific state by code
 * @param countryCode - ISO2 country code
 * @param stateCode - State code (e.g., 'CA', 'TX')
 * @returns Promise with state object or null if not found
 * @bundle Same as getStatesOfCountry - filters in memory
 */
declare function getStateByCode(countryCode: string, stateCode: string): Promise<IState | null>;
/**
 * Get all cities in a specific state
 * @param countryCode - ISO2 country code
 * @param stateCode - State code
 * @returns Promise with array of cities or empty array if not found
 * @bundle ~5-200KB depending on state - Loads {Country-CODE}/{State-CODE}/cities.json
 */
declare function getCitiesOfState(countryCode: string, stateCode: string): Promise<ICity[]>;
/**
 * Get ALL cities in an entire country
 * WARNING: Large data size - loads all state city files for the country
 * @param countryCode - ISO2 country code
 * @returns Promise with array of all cities in country
 * @bundle Large - loads multiple city files
 */
declare function getAllCitiesOfCountry(countryCode: string): Promise<ICity[]>;
/**
 * Get every city globally
 * WARNING: MASSIVE data (8MB+) - rarely needed, use sparingly
 * @returns Promise with array of all cities worldwide
 * @bundle 8MB+ - loads ALL city files
 */
declare function getAllCitiesInWorld(): Promise<ICity[]>;
/**
 * Get specific city by ID
 * @param countryCode - ISO2 country code
 * @param stateCode - State code
 * @param cityId - Database city ID
 * @returns Promise with city object or null if not found
 * @bundle Same as getCitiesOfState - filters in memory
 */
declare function getCityById(countryCode: string, stateCode: string, cityId: number): Promise<ICity | null>;

/**
 * Utility functions for @world/countries
 */

/**
 * Validate if a country code exists
 * @param countryCode - ISO2 country code
 * @returns Promise with boolean indicating if country exists
 */
declare function isValidCountryCode(countryCode: string): Promise<boolean>;
/**
 * Validate if a state code exists in a country
 * @param countryCode - ISO2 country code
 * @param stateCode - State code
 * @returns Promise with boolean indicating if state exists
 */
declare function isValidStateCode(countryCode: string, stateCode: string): Promise<boolean>;
/**
 * Search cities by name (partial match)
 * Note: This loads cities for the specified state only
 * @param countryCode - ISO2 country code
 * @param stateCode - State code
 * @param searchTerm - Search term (case-insensitive partial match)
 * @returns Promise with array of matching cities
 */
declare function searchCitiesByName(countryCode: string, stateCode: string, searchTerm: string): Promise<ICity[]>;
/**
 * Get country name from code
 * @param countryCode - ISO2 country code
 * @returns Promise with country name or null if not found
 */
declare function getCountryNameByCode(countryCode: string): Promise<string | null>;
/**
 * Get state name from code
 * @param countryCode - ISO2 country code
 * @param stateCode - State code
 * @returns Promise with state name or null if not found
 */
declare function getStateNameByCode(countryCode: string, stateCode: string): Promise<string | null>;
/**
 * Get timezone for specific city
 * @param countryCode - ISO2 country code
 * @param stateCode - State code
 * @param cityName - City name
 * @returns Promise with timezone string or null if not found
 */
declare function getTimezoneForCity(countryCode: string, stateCode: string, cityName: string): Promise<string | null>;
/**
 * Get all timezones for country
 * @param countryCode - ISO2 country code
 * @returns Promise with array of timezone names
 */
declare function getCountryTimezones(countryCode: string): Promise<string[]>;

export { type ICity, type ICountry, type ICountryMeta, type IState, type ITimezone, type ITranslations, getCountries as default, getAllCitiesInWorld, getAllCitiesOfCountry, getCitiesOfState, getCityById, getCountries, getCountryByCode, getCountryNameByCode, getCountryTimezones, getStateByCode, getStateNameByCode, getStatesOfCountry, getTimezoneForCity, isValidCountryCode, isValidStateCode, searchCitiesByName };

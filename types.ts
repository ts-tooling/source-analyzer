/**
 * Describes class members included in the API.
 */
export interface ApiClass {}

/**
 * Describes method properties included in the API.
 */
export interface ApiMethod {}

/**
 * Describes some exposed API module, to be used for analysis.
 */
export interface ApiModule {}

/**
 * A class-type exposed API module.
 */
export interface ApiClassModule extends ApiModule {}

/**
 * A function-type exposed API module.
 */
export interface ApiFunctionModule extends ApiModule {}
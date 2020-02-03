/**
 * Describes class members included in the API.
 */
export interface ApiClass {
    /** Exposed API methods. */
    methods: ApiMethod[];
}

/**
 * Describes method properties included in the API.
 */
export interface ApiMethod {
    /** Each item represents a parameter name and type. Format "name: type" */
    parameters: string[];
    /** Return type, trimmed. */
    returnType: string;
}

/**
 * Describes some exposed API module, to be used for analysis.
 */
export interface ApiModule {
    /** Unique module name. TODO namespacing */
    name: string;
}

/**
 * A class-type exposed API module.
 */
export interface ApiClassModule extends ApiModule, ApiClass {}

/**
 * A function-type exposed API module.
 */
export interface ApiFunctionModule extends ApiModule, ApiMethod {}
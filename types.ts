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
    /** The method's identifying name. */
    name: string;
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
    /** Unique module names of this module's dependencies. Corresponds to ApiModule.name. */
    dependencies: string[];
}

/**
 * A class-type exposed API module.
 */
export interface ApiClassModule extends ApiModule, ApiClass {}

/**
 * A function-type exposed API module.
 */
export interface ApiFunctionModule extends ApiModule, ApiMethod {}

/**
 * Represents a particular dependency digraph edge, from start to end.
 */
export interface ApiDependencyEdge {
    startNodeName: string;
    endNodeName: string;
}

/**
 * Represents a dependency digraph with each edge's "start" depending on its "end".
 */
export interface ApiDependencyDiGraph {
    edges: ApiDependencyEdge[];
}

/**
 * High-level indicator of an API change and whether that change is breaking or not.
 */
export interface ApiChange {
    breaking: boolean;
}

/**
 * Represents a change to an exposed API module.
 */
export interface ApiModuleChange extends ApiChange {
    moduleName: string;
    changeType: 'addition' | 'deletion';
}

/**
 * Represents a change to an exposed API module's method.
 */
export interface ApiMethodChange extends ApiChange {
    methodName: string;
    description: string;
}
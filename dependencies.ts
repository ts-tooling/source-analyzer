import {ApiDependencyDiGraph, ApiModule} from "./types";
import * as ts from "typescript";
import * as path from "path";
import {locateFileModules} from "./traversal";

/**
 * Performs a static code analysis on the provided application to produce a parsed-out ApiModule schema.
 * @param filename The application entry-point.
 */
export function getApplicationApiModules(filename: string): ApiModule[] {
    // Setup TypeScript AST
    const program = ts.createProgram([filename], {});

    // Filter files to only those we're processing (exclude libraries)
    const files = program.getSourceFiles().filter((file) =>
        file.fileName.indexOf(getImmediateDirectoryName(filename)) > -1);

    // Scan the source files for exposed API modules
    const apiModules: ApiModule[] = [];
    files.forEach((file) => apiModules.push(...locateFileModules(file)));

    // Clean the dependencies
    cleanModuleDependencies(apiModules);

    return apiModules;
}

/**
 * Produces a dependency digraph from parsed API modules.
 * @param apiModules The pre-parsed API modules to graph.
 */
export function getApiModuleDependencyGraph(apiModules: ApiModule[]): ApiDependencyDiGraph {
    // Map dependencies into edges; form a digraph
    const depGraph: ApiDependencyDiGraph = { edges: [] };
    apiModules.forEach((apiModule) => apiModule.dependencies.forEach((dep) =>
        depGraph.edges.push({ startNodeName: apiModule.name, endNodeName: dep })));

    return depGraph;
}

// Note: this is a workaround until I can better-distinguish identifiers from dependencies
function cleanModuleDependencies(apiModules: ApiModule[]) {
    // Accum. legitimate exposed API module names
    const legitModules: string[] = apiModules.map((apiModule) => apiModule.name);
    // Clean all modules' dependencies of invalid identifiers (including themselves)
    apiModules.forEach((apiModule) => apiModule.dependencies =
        apiModule.dependencies.filter((dep) =>
            dep !== apiModule.name &&
            legitModules.indexOf(dep) > -1));
}

// given a/b/c/d.ts, will return c; for filtering to immediate source files
function getImmediateDirectoryName(file: string): string {
    const pathPaths = file.split('/');
    return pathPaths[pathPaths.length - 2];
}
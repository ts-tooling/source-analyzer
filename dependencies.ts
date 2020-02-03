import {ApiDependencyDiGraph, ApiModule} from "./types";
import * as ts from "typescript";
import * as path from "path";
import {locateFileModules} from "./traversal";

export function getApplicationDependencyGraph(filename: string): ApiDependencyDiGraph {
    // Setup TypeScript AST
    const program = ts.createProgram([filename], {});

    // Filter files to only those we're processing (exclude libraries)
    const files = program.getSourceFiles().filter((file) =>
            file.fileName.indexOf(getImmediateDirectoryName(filename)) > -1);

    // Scan the source files for exposed API modules
    const apiModules: ApiModule[] = [];
    files.forEach((file) => apiModules.push(...locateFileModules(file)));

    console.log(JSON.stringify(apiModules));

    // TODO graph stuff
    return null;
}

function getImmediateDirectoryName(file: string): string {
    const pathPaths = file.split('/');
    return pathPaths[pathPaths.length - 2];
}
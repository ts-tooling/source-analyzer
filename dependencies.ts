import {ApiDependencyDiGraph} from "./types";
import * as ts from "typescript";
import * as path from "path";
import {locateFileModules} from "./traversal";

export function getApplicationDependencyGraph(file: string): ApiDependencyDiGraph {
    // Setup TypeScript AST
    const program = ts.createProgram(['sample-source-1/sample-source.ts'], {});
    const files = program.getSourceFiles().filter((file) => file.fileName.indexOf('sample-source-') > -1);

    // Scan the source files for exposed API modules
    files.forEach((file) => {
        console.group(`Searching for modules in ${path.basename(file.fileName)}...`);
        const apiModules = locateFileModules(file);
        console.log(`Located ${apiModules.length} modules: ${JSON.stringify(apiModules)}`);
        console.groupEnd();
    });

    // TODO graph stuff
    return null;
}
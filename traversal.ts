import * as ts from 'typescript';
import { ApiModule } from "./types";

export function recursiveNodeSearch(sourceFile: ts.SourceFile, root: ts.Node,
                                    matcher: (node: ts.Node) => boolean): ts.Node[] {
    // TODO
    return null;
}

export function recursiveFileSearch(sourceFile: ts.SourceFile,
                                    matcher: (node: ts.Node) => boolean): ts.Node[] {
    // TODO
    return null;
}

export function locateFileModules(sourceFile: ts.SourceFile): ApiModule[] {
    // TODO
    return null;
}
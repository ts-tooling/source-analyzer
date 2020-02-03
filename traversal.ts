import * as ts from 'typescript';
import { ApiModule } from "./types";

/**
 * Recursively searches AST for nodes truthy with the given matcher.
 * @param sourceFile The TS file to search. Note: This is a huge stability/performance consideration for TS API.
 * @param root The node to begin searching from.
 * @param matcher The lambda to determine whether a given node is a match or not.
 */
export function recursiveNodeSearch(sourceFile: ts.SourceFile, root: ts.Node,
                                    matcher: (node: ts.Node) => boolean): ts.Node[] {
    let matches: ts.Node[] = [];

    if (matcher(root))
        matches.push(root);

    const children = root.getChildren(sourceFile);
    if (children && children.length > 0)
        children.forEach((child) => matches.push(...recursiveNodeSearch(sourceFile, child, matcher)));

    return matches;
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

/** polyfill */
function flatMap<B, A>(items: B[], mapper: (B) => A[]): A[] {
    const after: A[] = [];
    items.forEach((before) => after.push(...mapper(before)));
    return after;
}
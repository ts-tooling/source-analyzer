import * as ts from 'typescript';
import {ApiClassModule, ApiFunctionModule, ApiModule} from "./types";

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

/**
 * Recursively searches the given file's AST for nodes truthy with the given matcher.
 * @param sourceFile The TS file to search. Note: This is a huge stability/performance consideration for TS API.
 * @param matcher The lambda to determine whether a given node is a match or not.
 */
export function recursiveFileSearch(sourceFile: ts.SourceFile, matcher: (node: ts.Node) => boolean): ts.Node[] {
    const children = sourceFile.getChildren(sourceFile);
    const mapper = (child: ts.Node) => recursiveNodeSearch(sourceFile, child, matcher);
    return flatMap(children, mapper);
}

/**
 * Processes the given file's AST for any exposed API modules (classes/func'ns).
 * @param sourceFile The file to statically search.
 */
export function locateFileModules(sourceFile: ts.SourceFile): ApiModule[] {
    // Collect exposed API modules (classes/func'ns)
    const apiDeclarations = recursiveFileSearch(sourceFile, (node: ts.Node) =>
        node.kind === ts.SyntaxKind.ClassDeclaration ||
        node.kind === ts.SyntaxKind.FunctionDeclaration
    ) as ts.DeclarationStatement[];

    const apiModules: ApiModule[] = [];
    apiDeclarations.forEach((apiModuleNode) => {
        // Accum. extra-module references
        const moduleTypeReferences = recursiveNodeSearch(sourceFile, apiModuleNode, (node: ts.Node) =>
                node.kind === ts.SyntaxKind.TypeReference ||
                node.kind === ts.SyntaxKind.Identifier
        ) as ts.TypeReferenceNode[];

        // Pull those references' names out
        const dependencyNames = moduleTypeReferences.map((depRef) =>
            depRef.typeName ? depRef.typeName.getText(sourceFile) : depRef.getText(sourceFile));

        // Create API module types based on the node kind
        const module: ApiModule = {
            name: apiModuleNode.name.text,
            dependencies: dependencyNames
        };
        switch(apiModuleNode.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
                const classModule = module as ApiClassModule;
                classModule.methods = [];
                break;
            case ts.SyntaxKind.FunctionDeclaration:
                const functionModule = module as ApiFunctionModule;
                functionModule.parameters = [];
                functionModule.returnType = '';
                break;
        }
        apiModules.push(module);
    });

    return apiModules;
}

// polyfill
function flatMap<B, A>(items: B[], mapper: (B) => A[]): A[] {
    const after: A[] = [];
    items.forEach((before) => after.push(...mapper(before)));
    return after;
}
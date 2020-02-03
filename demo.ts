import { getApiModuleDependencyGraph, getApplicationApiModules } from "./dependencies";
import {ApiClassModule, ApiModule} from "./types";
import {getApiChanges} from "./changes";

const apiModules = getApplicationApiModules('sample-source-1/sample-source.ts');
const depGraph = getApiModuleDependencyGraph(apiModules);

console.log(`ApiModules: ${JSON.stringify(apiModules)}`);
console.log(`DepGraph: ${JSON.stringify(depGraph)}`);

const before: ApiModule[] = [
    <ApiClassModule> {
        name: 'ClassA',
        methods: [
            { name: 'Method1', parameters: [ 'param1', 'param2' ], returnType: '' }
        ],
        dependencies: []
    },
    <ApiClassModule> {
        name: 'ClassB',
        methods: [
            { name: 'Method1', parameters: [ 'param1', 'param2' ], returnType: '' }
        ],
        dependencies: []
    }
];

const after: ApiModule[] = [
    <ApiClassModule> {
        name: 'ClassA',
        methods: [
            { name: 'Method1', parameters: [ 'param1' ], returnType: '' },
            { name: 'Method2', parameters: [ 'param1', 'param2' ], returnType: '' }
        ],
        dependencies: []
    },
    <ApiClassModule> {
        name: 'ClassB',
        methods: [
            { name: 'Method2', parameters: [ 'param1', 'param2' ], returnType: '' }
        ],
        dependencies: []
    },
    <ApiClassModule> {
        name: 'ClassC',
        methods: [
            { name: 'Method1', parameters: [ 'param1', 'param2' ], returnType: '' },
            { name: 'Method2', parameters: [], returnType: '' }
        ],
        dependencies: []
    }
];

const apiChanges = getApiChanges(before, after);

console.log(`ApiChanges: ${JSON.stringify(apiChanges)}`);
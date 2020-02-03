import { getApiModuleDependencyGraph, getApplicationApiModules } from "./dependencies";

const apiModules = getApplicationApiModules('sample-source-1/sample-source.ts');
const depGraph = getApiModuleDependencyGraph(apiModules);

console.log(`ApiModules: ${JSON.stringify(apiModules)}`);
console.log(`DepGraph: ${JSON.stringify(depGraph)}`);
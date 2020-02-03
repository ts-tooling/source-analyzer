import { getApplicationDependencyGraph } from "./dependencies";

const depGraph = getApplicationDependencyGraph('sample-source-1/sample-source.ts');

console.log(JSON.stringify(depGraph));
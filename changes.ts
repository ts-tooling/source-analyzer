import {ApiChange, ApiClassModule, ApiMethodChange, ApiModule, ApiModuleChange} from "./types";

/**
 * Detects module
 * @param before
 * @param after
 */
export function getApiChanges(before: ApiModule[], after: ApiModule[]): ApiChange[] {
    const apiChanges: ApiChange[] = [];

    // Scan for deleted modules
    before.forEach((beforeModule) => {
        const matchingAfterModules = after.filter((afterModule) => afterModule.name === beforeModule.name);
        if (matchingAfterModules.length === 0) {
            apiChanges.push(<ApiModuleChange>{
                moduleName: beforeModule.name,
                changeType: "deletion",
                breaking: true
            });
        }
    });

    // Scan for new modules
    after.forEach((afterModule) => {
        const matchingBeforeModules = before.filter((beforeModule) => beforeModule.name === afterModule.name);
        if (matchingBeforeModules.length === 0) {
            apiChanges.push(<ApiModuleChange>{
                moduleName: afterModule.name,
                changeType: "addition",
                breaking: false
            });
        }
    });

    // Boil some spaghetti to find modified methods
    after.forEach((afterModule) => {
        if ((afterModule as ApiClassModule).methods) {
            const afterClassModule = afterModule as ApiClassModule;
            const beforeClassModule = before.find((before) => before.name === afterModule.name) as ApiClassModule;
            if (beforeClassModule) {
                afterClassModule.methods.forEach((afterMethod) => {
                    const beforeMethod = beforeClassModule.methods.find((beforeMeth => beforeMeth.name === afterMethod.name));
                    let match = true;
                    let change = '';
                    afterMethod.parameters.forEach((afterParm) => {
                        if (beforeMethod.parameters.indexOf(afterParm) < 0) {
                            match = false;
                            change += `New after param ${afterParm} `;
                        }
                    });
                    if (!match) {
                        apiChanges.push(<ApiMethodChange>{
                            methodName: afterMethod.name,
                            description: change,
                            breaking: true
                        });
                    }
                })
            }
        }
    });

    return apiChanges;
}
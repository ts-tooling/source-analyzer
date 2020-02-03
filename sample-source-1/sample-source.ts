// root for sample source 1 - analysis starts from here

import { SomeClassA } from './some-class-a';
import { SomeClassB } from "./some-class-b";
import { TestFunction1, TestFunction2 } from "./some-exports-1";

export class SampleSource {
    constructor(
        a: SomeClassA,
        b: SomeClassB
    ) {}

    test() {
        TestFunction1();
        TestFunction2('', 1);
    }
}
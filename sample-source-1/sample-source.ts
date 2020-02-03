// root for sample source 1 - analysis starts from here

import { SomeClassA } from './some-class-a';
import { SomeClassB } from "./some-class-b";
import { TestFunction1, TestFunction2 } from "./some-exports-1";

new SomeClassA();
new SomeClassB();
TestFunction1();
TestFunction2('', 1);
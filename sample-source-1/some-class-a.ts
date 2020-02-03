export class SomeClassA {
    public someMethod1(test: string): number {
        return !test ? 0 : test.length;
    }
    private someHiddenMethod2(testy: string, par2: number): string {
        return `${testy}: ${par2}`;
    }
}
import { Calculator } from "./Calculator";

export function test() {
    const calculator = new Calculator();

    console.log(calculator.add(1, 2)); // 3
    console.log(calculator.add("a", "bc")); // abc

    calculator.add(null, 2); // catch
    calculator.add(undefined, 2); // catch
}

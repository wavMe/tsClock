import * as diffDecorator from "./diffDecorator";

export function test() {
    let helloWorld = new diffDecorator.HelloClass();
    let student = new diffDecorator.Student();
    student.print("abc", 123);
}

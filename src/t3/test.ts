import * as diffDecorator from "./iffDecorator";

export function test() {
    let helloWorld = new diffDecorator.HelloClass();
    let student = new diffDecorator.Student();
    student.print("abc", 123);
}

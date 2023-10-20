import { Example, hasWithTypes } from "./TypeCheck";

export function test() {
    const example = new Example();

    console.debug(hasWithTypes(example, "name", String)); // true
    console.debug(hasWithTypes(example, "name", Number)); // false
    console.debug(hasWithTypes(example, "age", Number)); // false
}

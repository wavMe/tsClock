import { DeepReadonly, Person } from "./DeepReadonly";


export function test() {
    type ReadonlyPerson = DeepReadonly<Person>;
    const person: ReadonlyPerson = {
        name: "wavMe",
        address: {
            city: "FZ",
        },
    };

    // 无法为“name”赋值，因为它是只读属性。ts(2540)
    // person.name = "xxx";
    // 无法为“city”赋值，因为它是只读属性。ts(2540)
    // person.address.city = "xxxx";
}

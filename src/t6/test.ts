import { Filter, Filter_Traverse } from "./TypeFilter";

export function test() {
    // 遍历 Object 和 递归方式两种
    type Fruit = "apple" | "banana" | "orange";
    type Fruits = ["apple", "banana", "orange", "cherry"];
    type OnlyFruits = Filter<Fruits, Fruit>; // ['apple', 'banana', 'orange']
    type OnlyFruits_Traverse = Filter_Traverse<Fruits, Fruit>; // ['apple', 'banana', 'orange']
}

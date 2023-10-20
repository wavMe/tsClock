export function hasWithTypes(target: any, propertyKey: string, propertyType: any): boolean {
    // 该属性是否存在
    if(Reflect.has(target, propertyKey)) {
        // 该属性是否是 type 类型
        return Reflect.get(target, propertyKey) instanceof propertyType;
    }
    return false;
}

export class Example {
    public name: String = new String("");
}
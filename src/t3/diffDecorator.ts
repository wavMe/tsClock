// ===装饰器之初体验===

// tsconfig.json
// "experimentalDecorators": true,
/* Enable experimental support for legacy experimental decorators. */

function helloWorld(target: any) {
    console.log("Hello World!");
}

function niHao(target: any) {
    console.log("Ni Hao!");
}

// 接受额外的参数
function printString(str: string) {
    // 函数柯里化 Currying
    // 真正的装饰器
    return function (target: any) {
        console.log("打印字符串:" + str);
    };
}

@helloWorld
@niHao
@printString("蚌埠乆餎")
export class HelloClass {}

// ===装饰器之分类===

function initStudent(name: string, age: number) {
    // Class Decorators 类装饰器
    /**
     * @param {Function} target 构造函数
     */
    return function (target: Function) {
        target.prototype.name = name;
        target.prototype.age = age;
    };
}

// Method Decorators 方法装饰器
/**
 * @param {any} target 对于实例成员来说是类的原型对象, 对于静态成员来说是类的构造函数
 * @param {string} propertyKey 成员的名字
 * @param {PropertyDescriptor} descriptor 成员的属性描述符
 */
function method(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}

// Accessor Decorators 访问器装饰器
/**
 * @param {any} target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param {string} propertyKey 成员的名字
 * @param {PropertyDescriptor} descriptor 成员的属性描述符
 */
function accessor(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    let originalGet = descriptor.get;
    let originalSet = descriptor.set;

    if (originalGet) {
        descriptor.get = function () {
            let value = originalGet!.call(this);
            console.log(
                `get {${value}} from ${propertyKey} by Accessor Decorator`
            );
            return value;
        };
    }

    if (originalSet) {
        descriptor.set = function (value: any) {
            console.log(
                `set {${value}} to ${propertyKey} by Accessor Decorator`
            );
            originalSet!.call(this, value);
        };
    }
}

// Parameter Decorators 参数装饰器
/**
 * @param {any} target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * @param {string} propertyKey 参数的名字
 * @param {number} parameterIndex 参数在函数参数列表中的索引
 */
function parameter(target: any, propertyKey: string, parameterIndex: number) {
    console.log("target: ", target);
    console.log("propertyKey: ", propertyKey);
    console.log("parameterIndex: ", parameterIndex);
}

// Property Decorators 属性装饰器

/**
 * @param {any} target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param {string} propertyKey 成员的名字
 */
function property(target: any, propertyKey: string) {
    let value = target[propertyKey];

    let getter = function () {
        console.log(`get {${value}} from ${propertyKey} by Property Decorator`);
        return value;
    };
    let setter = function (newValue: any) {
        console.log(
            `set {${newValue}} to ${propertyKey} by Property Decorators`
        );
        value = newValue;
    };
    // 替换属性，先删除原先的属性，再重新定义属性
    if (delete target[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
}

@initStudent("wavMe", 22)
export class Student {
    public _name!: string;
    @property
    public age!: number;
    public constructor() {
        console.log(this.name);
        console.log(this.age);
    }

    // 对于实例方法, target 是类的原型, 是一个对象
    // 这是因为实例方法是定义在类的原型上的，而不是类的构造函数或类的实例上
    @method
    public instanceMethod() {
        return "instance method";
    }

    // 对于静态方法, target 是类本身, 也就是类的构造函数
    // 静态方法是定义在类自身(也就是构造函数)上的, 而不是类的原型或类的实例上
    @method
    public static staticMethod() {
        return "static method";
    }

    @accessor
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public print(@parameter str: string, @parameter num: number) {
        console.log(str + ":" + num);
    }
}

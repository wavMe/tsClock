function catchError(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    let originMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        try {
            // let num = 5;
            // console.log(num instanceof Number);
            //// 值为 false，因为 num 是一个原始的数字类型，不是 Number 类的实例
            // console.log(typeof(num) === "number");
            //// 值为 true, typeof 只能用来检查原始类型的值

            // let numObj = new Number(5);
            // console.log(numObj instanceof Number);
            //// 值为 true，因为 numObj 是 Number 类的一个实例
            if (args.findIndex((item) => item === null) !== -1) {
                throw new Error("Parameter must not be null");
            } else if (args.findIndex((item) => item === undefined) !== -1) {
                throw new Error("Parameter must not be undefined");
            }

            return originMethod.apply(target, args);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                return;
            }
            console.log(error);
        }
    };

    return descriptor;
}

export class Calculator {
    @catchError
    public add(a: any, b: any): any {
        return a + b;
    }
}

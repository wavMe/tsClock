export type Filter<T extends any[],U> = 
{
    // [K in keyof T] 遍历 T 的所有属性，K 是属性的名字，keyof T 表示取 T 的所有键的联合类型。
    [K in keyof T]: T[K] extends U ? T[K] : never;
}[number][];
// 将前面映射得到的数组的索引类型改为 number，然后变成一个数组，去除 never

export type Filter_Traverse<T extends any[], U> = Filter_DeepTraverse<
    T,
    U
>[number][];
// 将前面映射得到的数组的索引类型改为 number，然后变成一个数组，去除 never

export type Filter_DeepTraverse<T extends any[], U> =
    // T 是否是 U 的子类型
    T extends U
        ? T
        : // T 是否是一个对象类型
        T extends object
        ? // [K in keyof T] 遍历 T 的所有属性，K 是属性的名字，keyof T 表示取 T 的所有键的联合类型。
          // 递归调用 Filter_Traverse，将属性的值 T[K] 作为新的 T，保持 U 不变，从而继续进行过滤
          { [K in keyof T]: Filter_DeepTraverse<T[K], U> }
        : never;
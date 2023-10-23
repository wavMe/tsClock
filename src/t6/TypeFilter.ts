export type Filter<T extends any[],U> = 
{
    [K in keyof T]: T[K] extends U ? T[K] : never;
}[number][];

export type Filter_Traverse<T extends any[], U> = Filter_DeepTraverse<
    T,
    U
>[number][];

export type Filter_DeepTraverse<T extends any[], U> = T extends U
    ? T
    : T extends object
    ? { [K in keyof T]: Filter_DeepTraverse<T[K], U> }
    : never;
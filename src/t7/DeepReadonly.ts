export interface Person {
    name: string;
    address: {
      city: string;
    };
}

export type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Object ? DeepReadonly<T[K]> : T[K];
};
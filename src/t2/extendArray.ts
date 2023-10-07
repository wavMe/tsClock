// 实现数组的 forEach、concat、copyWithin、filter、map、shift、unshift
// reduce、reverse、flat、findIndex、find、some、sort、slice、splice

/**
 * 1.往现有的Array中添加新的方法
 */

// declare global {
//     interface Array<T>
//     {
//         newFunc():void;
//     }
// }

// export function extendArray()
// {
//     Array.prototype.newFunc = function():void {console.log("Add new func");}
// }

/**
 * 2.新建一个自定义的类
 */

export class ArrayEX<T> {
    public length = 0;

    public constructor();
    public constructor(args: T[]);
    public constructor(args?: T[]) {
        if (args === undefined) {
            return;
        }

        // 动态添加属性
        // this对象 {0:1, 1:2, 2:3, length:3}
        let arr = this as any;
        let length = args.length;
        this.length = length;
        // 将args中的每个元素赋值到this对象的相应索引位置上
        for (let index = 0; index < length; index++) {
            arr[index] = args[index];
        }
    }

    public _forEach(
        callbackfn: (value: T, index: number, array: ArrayEX<T>) => void,
        thisArg?: any
    ): void {
        let arr = this as any;
        let length = this.length;
        for (let index = 0; index < length; index++) {
            callbackfn.call(thisArg, arr[index], index, this);
        }
    }

    public _concat(...arrEXs: ArrayEX<T>[]): ArrayEX<T> {
        let arr = this as any;
        let newArr: T[] = [];
        // 合并的本身数组
        this._forEach((v, k) => {
            newArr.push(arr[k]);
        });
        // 合并的额外数组
        arrEXs.forEach((arrEX) => {
            arrEX._forEach((v, k) => {
                newArr.push((arrEX as any)[k]);
            });
        });

        return new ArrayEX<T>(newArr);
    }

    public _copyWithin(target: number, start?: number, end?: number): this {
        let arr = this as any;
        let length = this.length;
        let targetIndex = target;
        let startIndex = start ?? 0;
        let endIndex = end ?? length;

        // 若传入参数为负数 则加上长度
        if (targetIndex < 0) targetIndex += length;
        if (startIndex < 0) startIndex += length;
        if (endIndex < 0) endIndex += length;

        // 取复制元素
        let copyArr: T[] = [];
        for (
            let index = startIndex;
            index < endIndex && index < this.length;
            ++index
        ) {
            copyArr.push(arr[index]);
        }

        // 赋值给目标位置
        for (
            let index = 0;
            index < copyArr.length && index + targetIndex < this.length;
            ++index
        ) {
            arr[index + targetIndex] = copyArr[index];
        }

        return this;
    }

    public _filter(
        predicate: (value: T, index: number, array: ArrayEX<T>) => boolean,
        thisArg?: any
    ): ArrayEX<T> {
        let arr = this as any;
        let length = this.length;
        let newArr: T[] = [];

        for (let index = 0; index < length; index++) {
            let value = arr[index];
            if (predicate.call(thisArg, value, index, this)) {
                newArr.push(value);
            }
        }

        return new ArrayEX(newArr);
    }

    public _map<U>(
        callbackfn: (value: T, index: number, array: ArrayEX<T>) => U,
        thisArg?: any
    ): ArrayEX<U> {
        let arr = this as any;
        let length = this.length;
        let newArr: U[] = [];
        for (let index = 0; index < length; index++) {
            newArr.push(callbackfn.call(thisArg, arr[index], index, this));
        }
        return new ArrayEX(newArr);
    }

    public _shift(): T | undefined {
        let arr = this as any;
        let length = this.length;
        if (length <= 0) {
            return undefined;
        }

        let shiftValue = arr[0];
        // 将原有元素全部前移 1位
        for (let index = 1; index < length; index++) {
            arr[index - 1] = arr[index];
        }
        delete arr[length - 1];
        this.length--;
        return shiftValue;
    }

    public _unshift(...items: T[]): number {
        let arr = this as any;
        let length = this.length;
        let addLength = items.length;

        // 将原有元素全部后移 addLength
        for (let index = length - 1; index >= 0; index--) {
            arr[index + addLength] = arr[index];
        }
        // 将新添元素全部加入
        for (let index = 0; index < addLength; index++) {
            arr[index] = items[index];
        }

        this.length += addLength;
        return this.length;
    }

    // _reduce的声明
    public _reduce(
        callbackfn: (
            previousValue: T,
            currentValue: T,
            currentIndex: number,
            array: ArrayEX<T>
        ) => T,
        initialValue?: T
    ): T;
    public _reduce<U>(
        callbackfn: (
            previousValue: U,
            currentValue: T,
            currentIndex: number,
            array: ArrayEX<T>
        ) => U,
        initialValue?: U
    ): U;
    // _reduce的实现
    public _reduce(callbackfn: any, initialValue?: any) {
        let arr = this as any;
        // 未传初始值
        let preVal = arr[0];
        let startIndex = 1;
        // 传入初始值
        if (initialValue !== undefined) {
            preVal = initialValue;
            startIndex = 0;
        }

        for (let index = startIndex; index < this.length; index++) {
            preVal = callbackfn.call(
                undefined,
                preVal,
                arr[index],
                index,
                this
            );
        }

        return preVal;
    }

    // public _reduce<U = T>(
    //     callbackfn: (
    //         previousValue: U,
    //         currentValue: T,
    //         currentIndex: number,
    //         array: ArrayEX<T>
    //     ) => U,
    //     initialValue?: U
    // ) {}

    public _reverse(): ArrayEX<T> {
        let arr = this as any;
        let length = this.length;
        for (let left = 0, right = length - 1; left < right; left++, right--) {
            let tmp = arr[left];
            arr[left] = arr[right];
            arr[right] = tmp;
        }
        return this;
    }

    // _push的声明
    public _push(arrEX: ArrayEX<T>): number;
    public _push(arr: T[]): number;
    public _push(item: T, ...rest: T[]): number;
    // _push的实现
    public _push(arg: ArrayEX<T> | T[] | T, ...rest: T[]): number {
        let arr = this as any;
        let length = this.length;

        let pushArr: any;
        // ArrayEX Array
        if (arg instanceof ArrayEX || arg instanceof Array) {
            pushArr = arg as any;
        }
        // T
        else {
            arr[length] = arg;
            length++;
            this.length = length;

            pushArr = rest as any;
        }

        let pushLength = pushArr.length;
        for (let index = 0; index < pushLength; index++) {
            arr[length + index] = pushArr[index];
        }
        this.length = length + pushLength;

        return this.length;
    }

    public _flat(depth: number = 1): ArrayEX<T> {
        let resArrEX = new ArrayEX<T>();

        // 单次拍平 递归函数
        function _flatOnce(arrEX: ArrayEX<T>, depth: number): void {
            // 已极限拍平 加入resArrEX 向上归还一层
            if (depth <= 0) {
                resArrEX._push(arrEX);
                return;
            }

            let arr = arrEX as any;
            let length = arrEX.length;
            for (let index = 0; index < length; index++) {
                let value = arr[index];
                // 当前元素是ArrayEX的实例 向下递进一层 并break掉
                if (value instanceof ArrayEX) {
                    _flatOnce(value, depth - 1);
                    break;
                }
                // 当前元素是值 直接加入resArrEX
                resArrEX._push(value);
            }
        }

        _flatOnce(this, depth);
        return resArrEX;
    }

    public _findIndex(
        predicate: (value: T, index: number, obj: ArrayEX<T>) => unknown,
        thisArg?: any
    ): number {
        let arr = this as any;
        let length = this.length;
        let findIndex: number = -1;
        for (let index = 0; index < length; index++) {
            if (predicate.call(thisArg, arr[index], index, this)) {
                findIndex = index;
                break;
            }
        }
        return findIndex;
    }

    public _find(
        predicate: (value: T, index: number, obj: ArrayEX<T>) => unknown,
        thisArg?: any
    ): T | undefined {
        let arr = this as any;
        let length = this.length;
        let findValue: T | undefined = undefined;
        for (let index = 0; index < length; index++) {
            if (predicate.call(thisArg, arr[index], index, this)) {
                findValue = arr[index];
                break;
            }
        }
        return findValue;
    }

    public _some(
        predicate: (value: T, index: number, array: ArrayEX<T>) => unknown,
        thisArg?: any
    ): boolean {
        let arr = this as any;
        let length = this.length;
        let haveSome = false;
        for (let index = 0; index < length; index++) {
            if (predicate.call(thisArg, arr[index], index, this)) {
                haveSome = true;
                break;
            }
        }
        return haveSome;
    }

    public _sort(compareFn?: (a: T, b: T) => number): this {
        let arr = this as any;
        let length = this.length;

        // 若未传入compareFn 默认为升序排序
        if (compareFn === undefined) {
            compareFn = (a: T, b: T) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            };
        }

        // 快排 递归函数
        function _quickSort(
            l: number,
            r: number,
            compareFn: (a: T, b: T) => number
        ) {
            // 已越界 向上归还一层
            if (l >= r) {
                return;
            }

            let i = l - 1;
            let j = r + 1;
            let pivot = arr[(l + r) >> 1];

            while (i < j) {
                do {
                    i++;
                } while (compareFn(arr[i], pivot));
                do {
                    j--;
                } while (compareFn(arr[i], pivot));

                if (i < j) {
                    let tmp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tmp;
                }
            }

            // 处理分界点两侧数组 向下递进一层
            _quickSort(l, j, compareFn);
            _quickSort(j + 1, r, compareFn);
        }

        _quickSort(0, length - 1, compareFn);
        return this;
    }

    public _slice(start?: number, end?: number): ArrayEX<T> {
        let arr = this as any;
        let length = this.length;

        let startIndex = start ?? 0;
        if (startIndex < 0) startIndex += length;
        let endIndex = end ?? length;
        if (endIndex < 0) endIndex += length;

        let newArr: T[] = [];
        for (let index = startIndex; index < endIndex; index++) {
            newArr.push(arr[index]);
        }

        return new ArrayEX(newArr);
    }

    public _splice(start: number, deleteCount?: number): T[];
    public _splice(start: number, deleteCount: number, ...items: T[]): T[];
    public _splice(start: number, deleteCount?: number, ...items: T[]): T[] {
        let arr = this as any;
        let length = this.length;

        let startIndex = start ?? 0;
        if (startIndex < 0) startIndex += length;
        let delCount = deleteCount ?? length - startIndex;
        let endIndex = startIndex + delCount;

        // 新增
        let addArr = items;
        // 原
        for (let index = endIndex; index < length; index++) {
            addArr.push(arr[index]);
        }

        // 从开始处 全部删除
        let delArr: T[] = [];
        for (let index = startIndex; index < length; index++) {
            // 记录到结束处
            if (index < endIndex) delArr.push(arr[index]);
            delete arr[index];
        }

        // 重设长度 从开始删除处 push新增+原
        this.length = startIndex;
        this._push(addArr);

        return delArr;

        // Ⅱ
        // let arr = this as any;
        // let length = this.length;

        // let delStartIndex = start ?? 0;
        // if (delStartIndex < 0) delStartIndex += length;
        // let delCount = deleteCount ?? length - delStartIndex;
        // let delEndIndex = delStartIndex + delCount;

        // // 记录删除元素
        // let delArr: T[] = [];
        // for (let index = delStartIndex; index < delEndIndex; index++) {
        //     delArr.push(arr[index]);
        // }

        // let addArr = items;
        // let addCount = addArr.length;
        // let offset = addCount - delCount;
        // // 重整原数组序号 留出新增元素的空位
        // for (let index = length - 1; index >= delEndIndex; index--) {
        //     arr[index + offset] = arr[index];
        //     delete arr[index];
        // }
        // // 增加新的元素
        // for (let index = 0; index < addCount; index++) {
        //     arr[index + delStartIndex] = addArr[index];
        // }

        // // 重设长度
        // this.length = length + offset;

        // return delArr;
    }
}

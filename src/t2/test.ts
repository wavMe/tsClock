import { ArrayEX } from "./xtendArray";
import { MapEX } from "./xtendMap";

export function test() {
    // let originArr = [1, 2, 3];
    // originArr.forEach();
    // originArr.concat();
    // originArr.copyWithin();
    // originArr.filter();
    // originArr.map();
    // originArr.shift();
    // originArr.unshift();
    // originArr.reduce();
    // originArr.reverse();
    // originArr.findIndex();
    // originArr.find();
    // originArr.some();
    // originArr.sort();
    // originArr.slice();
    // originArr.splice();

    // let originMatrix = [2, [3, [1]]];
    // let flatArr = originMatrix.flat(Infinity);

    // forEach
    let arrEX = new ArrayEX([1, 2, 3, 4, 5]);
    arrEX._forEach((v, k) => {
        console.log(`${k},${v}`);
    });

    // concat
    let arrEX1 = new ArrayEX([4, 5, 6]);
    let arrEX2 = new ArrayEX([7, 8, 9]);

    let concatArrEX = arrEX._concat(arrEX1, arrEX2);

    arrEX._copyWithin(3, 0, 2);
    // arrEX._copyWithin(3, -5, 2);
    // arrEX._copyWithin(3, 0, -3);
    // arrEX._copyWithin(3, -5, -3);

    arrEX._copyWithin(-2, 0, 2);
    // arrEX._copyWithin(-2, -5, 2);
    // arrEX._copyWithin(-2, 0, -3);
    // arrEX._copyWithin(-2, -5, -3);

    // filter
    let filterArrEX = arrEX._filter((value) => value % 2 === 0);

    // map
    let mapArrEX = arrEX._map((value) => value.toString());

    // shift
    let shiftValue = arrEX._shift();

    // unshift
    let unshiftLength = arrEX._unshift(9, 9);

    //  reduce
    let max = arrEX._reduce((accumulator, currentValue) =>
        Math.max(accumulator)
    );

    let count = arrEX._reduce((accumulator, currentValue) => {
        (accumulator as any)[currentValue] =
            ((accumulator as any)[currentValue] || 0) + 1;
        return accumulator;
    }, {});

    // reverse
    arrEX._reverse();

    // flat
    let matrixEX = new ArrayEX([2, new ArrayEX([3, new ArrayEX([1])])]);
    arrEX = matrixEX._flat(Infinity) as ArrayEX<number>;

    let findIndex = arrEX._findIndex((findValue) => findValue === 3);
    let findValue = arrEX._find((findValue) => findValue === 33);
    let haveSome = arrEX._some((haveValue) => haveValue === 333);
    let sortArrEX = arrEX._sort();
    let sliceArrEX = arrEX._slice(1);
    // sliceArrEX = arrEX._slice(-2);

    // sliceArrEX = arrEX._slice(1, 2);
    // sliceArrEX = arrEX._slice(1, -1);
    // sliceArrEX = arrEX._slice(-2, 2);
    // sliceArrEX = arrEX._slice(-2, -1);

    let delArr = arrEX._splice(1, 0, 9);
    // let delArr = arrEX._splice(-2, 2, 9);

    // let originMap = new Map();
    // originMap.set(0, "aaa");
    // originMap.set(5, "bbb");
    // originMap.set(10, "ccc");

    // let originKeys = originMap.keys();
    // let originValues = originMap.values();
    // let originEntries = originMap.entries();

    let mapEX = new MapEX();
    mapEX._set(1, "xxx");
    mapEX._set(7, "yyy");
    mapEX._set(9, "zzz");

    let keys = mapEX._keys();
    for (let key of keys) {
        console.log(key);
    }
    let values = mapEX._values();
    for (let value of values) {
        console.log(value);
    }
    let entries = mapEX._entries();
    for (let entry of entries) {
        console.log(entry);
    }

    // console.log("wait");
}

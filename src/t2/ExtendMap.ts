interface Pair<K, V> {
    key: K;
    value: V;
}

enum E_MapEXIteratorType {
    Keys,
    Values,
    Entries,
}

export class MapEX<K, V> {
    private data: Pair<K, V>[] = [];

    public _getData(): Pair<K, V>[] {
        return this.data;
    }

    public _set(key: K, value: V): void {
        let index = this.data.findIndex((pair) => pair.key === key);
        // 不存在该键
        if (index === -1) {
            this.data.push({ key, value });
            return;
        }
        // 已存在该键
        this.data[index].value = value;
    }

    public _get(key: K) {
        let pair = this.data.find((pair) => pair.key === key);
        // 是否存在该键值对
        return pair === undefined ? undefined : pair.value;
    }

    public _keys(): MapEXIterator<K, V> {
        return new MapEXIterator<K, V>(this, E_MapEXIteratorType.Keys);
    }

    public _values(): MapEXIterator<K, V> {
        return new MapEXIterator<K, V>(this, E_MapEXIteratorType.Values);
    }

    public _entries(): MapEXIterator<K, V> {
        return new MapEXIterator<K, V>(this, E_MapEXIteratorType.Entries);
    }
}

class MapEXIterator<K, V> implements IterableIterator<K | V | Pair<K, V>> {
    private mapEX: MapEX<K, V>;
    private e_type: E_MapEXIteratorType;
    private index: number;

    public constructor(mapEX: MapEX<K, V>, e_type: E_MapEXIteratorType) {
        this.mapEX = mapEX;
        this.e_type = e_type;
        this.index = 0;
    }

    public next(): IteratorResult<K>;
    public next(): IteratorResult<V>;
    public next(): IteratorResult<Pair<K, V>>;
    public next(): IteratorResult<K | V | Pair<K, V>> {
        let data = this.mapEX._getData();

        switch (this.e_type) {
            case E_MapEXIteratorType.Keys:
                if (this.index < data.length) {
                    return { value: data[this.index++].key, done: false };
                }
                return { value: undefined, done: true };
            case E_MapEXIteratorType.Values:
                if (this.index < data.length) {
                    return { value: data[this.index++].value, done: false };
                }
                return { value: undefined, done: true };
            case E_MapEXIteratorType.Entries:
                if (this.index < data.length) {
                    return { value: data[this.index++], done: false };
                }
                return { value: undefined, done: true };
            default:
                throw new Error("Invalid MapEX's Iterator Type");
        }
    }

    public [Symbol.iterator](): IterableIterator<K>;
    public [Symbol.iterator](): IterableIterator<V>;
    public [Symbol.iterator](): IterableIterator<Pair<K, V>>;
    public [Symbol.iterator](): IterableIterator<K | V | Pair<K, V>> {
        return this;
    }
}

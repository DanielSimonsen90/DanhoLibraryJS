declare global {
    interface Map<K, V> {
        /**
         * Converts into Array<[Key, Value]>
         */
        array(): Array<[K, V]>
        /**
         * Maps values into new types of generics
         * @param callback Callbacking function to map values
         */
        map<EK, EV>(callback: (value: V, key: K, index: number, self: this) => [EK, EV]): Map<EK, EV>
        /**
         * Returns array of "accepted" values. Criteria defined in callback param
         * @param callback Callbacking function to filter away unwanted values
         */
        filter(callback: (value: V, key: K, index: number, self: this) => boolean): Map<K, V>
        /**
         * Returns array of keys
         */
        keyArr(): Array<K>
        /**
         * Returns array of values
         */
        valueArr(): Array<V>
        /**
         * Returns first [key, value] match to callback param. Returns undefined if nothing found
         * @param callback Callbacking function to find KeyValuePair
         */
        find(callback: (value: V, key: K, index: number, self: this) => boolean): [K, V] | undefined
        /**
         * Whether or not map includes a  value. Returns true if it does, false if not ¯\_(ツ)_/¯ 
         * @param value Value that may be includded in map
         * @param fromIndex Start looking for value from specific index+. Default: 0
         */
        includes(value: V, fromIndex?: number): boolean
    }
}

function array<K, V>(this: Map<K, V>): Array<[K, V]> {
    let result = new Array<[K, V]>();
    for (const kvp of this) {
        result.push(kvp);
    }
    return result;
}
Map.prototype.array = array;

function map<K, V, EK, EV>(this: Map<K, V>, callback: (value: V, key: K, index: number, map: Map<K, V>) => [EK, EV]): Map<EK, EV> {
    return this.array()
        .map(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => 
            map.set(key, value), 
        new Map<EK, EV>())
}
Map.prototype.map = map;

function filter<K, V>(this: Map<K, V>, callback: (value: V, key: K, index: number, map: Map<K, V>) => boolean): Map<K, V> {
    return this.array()
        .filter(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => 
            map.set(key, value), 
        new Map<K, V>())
}
Map.prototype.filter = filter;

function keyArr<K, V>(this: Map<K, V>): Array<K> {
    return this.array().map(([k]) => k);
}
Map.prototype.keyArr = keyArr;

function valueArr<K, V>(this: Map<K, V>): Array<V> {
    return this.array().map(([_, v]) => v);
}
Map.prototype.valueArr = valueArr;

function find<K, V>(this: Map<K, V>, callback: (value: V, key: K, index: number, map: Map<K, V>) => boolean) {
    return this.array().find(([k, v], i) => callback(v, k, i, this));
}
Map.prototype.find = find;

function includes<K, V>(this: Map<K, V>, item: V, fromIndex?: number) {
    return this.valueArr().includes(item, fromIndex);
}
Map.prototype.includes = includes;

export const MapExtensions = {
    array, map, filter, keyArr, valueArr, find, includes
}
declare global {
    interface Map<K, V> {
        /**
         * Converts into Array<[Key, Value]>
         */
        array(): Array<[K, V]>;
        /**
         * Maps values into new types of generics
         * @param callback Callbacking function to map values
         */
        map<EK, EV>(callback: (value: V, key: K, index: number, self: this) => [EK, EV]): Map<EK, EV>;
        /**
         * Returns array of "accepted" values. Criteria defined in callback param
         * @param callback Callbacking function to filter away unwanted values
         */
        filter(callback: (value: V, key: K, index: number, self: this) => boolean): Map<K, V>;
        /**
         * Returns array of keys
         */
        keyArr(): Array<K>;
        /**
         * Returns array of values
         */
        valueArr(): Array<V>;
        /**
         * Returns first [key, value] match to callback param. Returns undefined if nothing found
         * @param callback Callbacking function to find KeyValuePair
         */
        find(callback: (value: V, key: K, index: number, self: this) => boolean): [K, V] | undefined;
        /**
         * Whether or not map includes a  value. Returns true if it does, false if not ¯\_(ツ)_/¯
         * @param value Value that may be includded in map
         * @param fromIndex Start looking for value from specific index+. Default: 0
         */
        includes(value: V, fromIndex?: number): boolean;
    }
}
declare function array<K, V>(this: Map<K, V>): Array<[K, V]>;
declare function map<K, V, EK, EV>(this: Map<K, V>, callback: (value: V, key: K, index: number, map: Map<K, V>) => [EK, EV]): Map<EK, EV>;
declare function filter<K, V>(this: Map<K, V>, callback: (value: V, key: K, index: number, map: Map<K, V>) => boolean): Map<K, V>;
declare function keyArr<K, V>(this: Map<K, V>): Array<K>;
declare function valueArr<K, V>(this: Map<K, V>): Array<V>;
declare function find<K, V>(this: Map<K, V>, callback: (value: V, key: K, index: number, map: Map<K, V>) => boolean): [K, V] | undefined;
declare function includes<K, V>(this: Map<K, V>, item: V, fromIndex?: number): boolean;
export declare const MapExtensions: {
    array: typeof array;
    map: typeof map;
    filter: typeof filter;
    keyArr: typeof keyArr;
    valueArr: typeof valueArr;
    find: typeof find;
    includes: typeof includes;
};
export {};

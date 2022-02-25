export {};
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

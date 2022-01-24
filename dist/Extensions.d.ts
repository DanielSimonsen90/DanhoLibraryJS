import ElementOptions from "./Interfaces/ElementOptions";
import IReplacement from "./Interfaces/IReplacement";
declare global {
    interface Document {
        /**
         * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
         * @param tagName HTMLElement tag name
         * @param options Construction options, instead of assigning values after construction
         */
        createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions<K>): HTMLElementTagNameMap[K];
    }
    interface HTMLCollection {
        /**
         * Converts HTMLCollection to Element[]
         */
        array(): Element[];
    }
    interface Array<T> {
        /**
         * Pushes items to array and returns self with new items
         * @param items Items to add to array
         */
        add(...items: Array<T>): this;
        /**
         * Removes item from array and returns self without item
         * @param item Item to remove
         */
        remove(item: T): this;
        /**
         * Returns a random element from array
         */
        random(): T;
        /**
         * Returns item matching index. If negative number, subtracts number from length
         * @param i Index of item
         */
        index(i: number): T;
    }
    interface Map<K, V> {
        /**
         * Converts into Array<[Key, Value]>
         */
        array(): Array<[K, V]>;
        /**
         * Maps values into new types of generics
         * @param callback Callbacking function to map values
         */
        map<EK, EV>(callback: (value: V, key?: K, index?: number, self?: this) => [EK, EV]): Map<EK, EV>;
        /**
         * Returns array of "accepted" values. Criteria defined in callback param
         * @param callback Callbacking function to filter away unwanted values
         */
        filter(callback: (value: V, key?: K, index?: number, self?: this) => boolean): this;
        /**
         * Returns array of keys
         */
        keyArr(): Array<K>;
        valueArr(): Array<V>;
        /**
         * Returns first [key, value] match to callback param
         * @param callback Callbacking function to find KeyValuePair
         */
        find(callback: (value: V, key?: K, index?: number, self?: this) => boolean): [K, V];
        /**
         * Whether or not map includes a  value. Returns true if it does, false if not ¯\_(ツ)_/¯
         * @param value Value that may be includded in map
         * @param fromIndex Start looking for value from specific index+. Default: 0
         */
        includes(value: V, fromIndex?: number): boolean;
    }
    interface String {
        /**
         * Uppercases first letter of string
         */
        toPascalCase(): string;
        /**
         * Replaces "replacer" (default: ' ') with "replacement" (default: '_')
         * @param replaceOptions This is practically your stereotypical String.replace, if you really want it to be
         */
        toSnakeCase(replaceOptions?: IReplacement): string;
        /**
         * Replaces "replacer" (default: ' ') with "replacement" (default: '-')
         * @param replaceOptions This is practically your stereotypical String.replace, if you really want it to be
         */
        toKebabCase(replaceOptions?: IReplacement): string;
        /**
         * String.substring but accepting negative numbers to cut from length
         * @param start Start of string. 0 indexed
         * @param end End of string. 0 indexed, if negative number, substracts number from length
         */
        clip(start: number, end?: number): string;
    }
}

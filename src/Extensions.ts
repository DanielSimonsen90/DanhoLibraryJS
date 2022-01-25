import ElementOptions from "./Interfaces/ElementOptions";
import IReplacement from "./Interfaces/IReplacement";

declare global {
    interface Document {
        /**
         * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
         * @param tagName HTMLElement tag name
         * @param options Construction options, instead of assigning values after construction
         */
        createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions): HTMLElementTagNameMap[K]
    }
    interface HTMLCollection {
        /**
         * Converts HTMLCollection to Element[]
         */
        array(): Element[]
    }
    interface Array<T> {
        /**
         * Pushes items to array and returns self with new items
         * @param items Items to add to array
         */
        add(...items: Array<T>): this
        /**
         * Removes item from array and returns self without item
         * @param item Item to remove
         */
        remove(item: T | number): this
        /**
         * Returns a random element from array
         */
        random(): T
        /**
         * Returns item matching index. If negative number, subtracts number from length
         * @param i Index of item
         */
        index(i: number): T
    }
    interface Map<K, V> {
        /**
         * Converts into Array<[Key, Value]>
         */
        array(): Array<[K, V]>
        /**
         * Maps values into new types of generics
         * @param callback Callbacking function to map values
         */
        map<EK, EV>(callback: (value: V, key?: K, index?: number, self?: this) => [EK, EV]): Map<EK, EV>
        /**
         * Returns array of "accepted" values. Criteria defined in callback param
         * @param callback Callbacking function to filter away unwanted values
         */
        filter(callback: (value: V, key?: K, index?: number, self?: this) => boolean): this
        /**
         * Returns array of keys
         */
        keyArr(): Array<K>
        /**
         * Returns array of values
         */
        valueArr(): Array<V>
        /**
         * Returns first [key, value] match to callback param
         * @param callback Callbacking function to find KeyValuePair
         */
        find(callback: (value: V, key?: K, index?: number, self?: this) => boolean): [K, V] | undefined
        /**
         * Whether or not map includes a  value. Returns true if it does, false if not ¯\_(ツ)_/¯ 
         * @param value Value that may be includded in map
         * @param fromIndex Start looking for value from specific index+. Default: 0
         */
        includes(value: V, fromIndex?: number): boolean
    }
    interface String {
        /**
         * Uppercases first letter of string
         */
        toPascalCase(): string
        /**
         * Replaces "replacer" (default: ' ') with "replacement" (default: '_')
         * @param replaceOptions This is practically your stereotypical String.replace, if you really want it to be
         */
        toSnakeCase(replaceOptions?: IReplacement): string
        /**
         * Replaces "replacer" (default: ' ') with "replacement" (default: '-')
         * @param replaceOptions This is practically your stereotypical String.replace, if you really want it to be
         */
        toKebabCase(replaceOptions?: IReplacement): string,
        /**
         * String.substring but accepting negative numbers to cut from length
         * @param start Start of string. 0 indexed
         * @param end End of string. 0 indexed, if negative number, substracts number from length
         */
        clip(start: number, end?: number): string
    }
}

Document.prototype.createProperElement = function<K extends keyof HTMLElementTagNameMap>(this: Document, tagName: K, options?: ElementOptions) {
    let baseElement = document.createElement(tagName);
    if (!options) return baseElement;

    if (options.classes) {
        baseElement.classList.add(...options.classes);
    }
    
    if (options.attributes) {
        options.attributes.forEach(([attribute, value]) => baseElement.setAttribute(attribute, value));
    }

    if (options.children) {
        baseElement.append(...new Array().concat(options.children));
    }

    if (options.events) {
        options.events.forEach(({ name, handler }) => (
            baseElement.addEventListener(name, handler)
        ))
    }

    return baseElement;
}

HTMLCollection.prototype.array = function(this: HTMLCollection) {
    let result = new Array<Element>();

    for (let i = 0; i < this.length; i++) {
        const item = this.item(i);
        if (item !== null) result.push(item);
    }
    return result;
}

Array.prototype.add = function<T>(this: Array<T>, ...items: Array<T>) {
    this.push(...items);
    return this;
}
Array.prototype.remove = function<T>(this: Array<T>, value: T | number): Array<T> {
    const index = typeof value === 'number' ? value : this.indexOf(value);
    if (index > -1) this.splice(index, 1);
    return this;
}
Array.prototype.random = function<T>(this: Array<T>): T {
    const randomIndex = Math.round(Math.random() * this.length);
    return this[randomIndex];
}
Array.prototype.index = function<T>(this: Array<T>, i: number): T {
    return this[i < 0 ? this.length + i : i];
}

Map.prototype.array = function<K, V>(this: Map<K, V>): Array<[K, V]> {
    let result = new Array<[K, V]>();
    for (const kvp of this) {
        result.push(kvp);
    }
    return result;
}
Map.prototype.map = function<K, V, EK, EV>(this: Map<K, V>, callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => [EK, EV]): Map<EK, EV> {
    return this.array()
        .map(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => 
            map.set(key, value), 
        new Map<EK, EV>())
}
Map.prototype.filter = function<K, V>(this: Map<K, V>, callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): Map<K, V> {
    return this.array()
        .filter(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => 
            map.set(key, value), 
        new Map<K, V>())
}
Map.prototype.keyArr = function<K, V>(this: Map<K, V>): Array<K> {
    return this.array().map(([k]) => k);
}
Map.prototype.valueArr = function<K, V>(this: Map<K, V>): Array<V> {
    return this.array().map(([_, v]) => v);
}
Map.prototype.find = function<K, V>(this: Map<K, V>, callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean) {
    return this.array().find(([k, v], i) => callback(v, k, i, this));
}
Map.prototype.includes = function<K, V>(this: Map<K, V>, item: V, fromIndex?: number) {
    return this.valueArr().includes(item, fromIndex);
}

String.prototype.toPascalCase = function(this: string) {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
}
function spaceReplacer(self: string, replacer: string | RegExp, replacement: string) {
    return self.replace(new RegExp(`${typeof replacer == 'string' ? replacer : replacer.source}+`), replacement);
}
String.prototype.toSnakeCase = function(this: string, replaceOptions: IReplacement) {
    return spaceReplacer(this, replaceOptions.replacer || ' ', replaceOptions.replacement || '_')
}
String.prototype.toKebabCase = function(this: string, replaceOptions: IReplacement) {
    return spaceReplacer(this, replaceOptions.replacer || ' ', replaceOptions.replacement || '-');
}
String.prototype.clip = function(this: string, start: number, end?: number) {
    return this.substring(start, end && end < 0 ? this.length + end : end);
}
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
        remove(item: T): this
    }
    interface Map<K, V> {
        /**
         * Converts into Array<[Key, Value]>
         */
        array(): [K, V][]
        /**
         * Maps values into new types of generics
         * @param callback Callbacking function to map values
         */
        map<EK, EV>(callback: (value: V, key?: K, index?: number, map?: this) => [EK, EV]): Map<EK, EV>
        /**
         * Returns array of "accepted" values. Criteria defined in callback param
         * @param callback Callbacking function to filter away unwanted values
         */
        filter(callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): Map<K, V>
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
        find(callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): [K, V]
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
        toKebabCase(replaceOptions?: IReplacement): string
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
        baseElement.append(...options.children);
    }

    if (options.events) {
        options.events.forEach(({ name, handlers }) => (
            handlers.forEach(handler => (
                baseElement.addEventListener(name, handler)
            ))
        ))
    }

    return baseElement;
}

HTMLCollection.prototype.array = function(this: HTMLCollection) {
    let result = new Array<Element>();

    for (let i = 0; i < this.length; i++) {
        result.push(this.item(i));
    }
    return result;
}

Array.prototype.add = function<T>(this: Array<T>, ...items: Array<T>) {
    this.push(...items);
    return this;
}
Array.prototype.remove = function<T>(this: Array<T>, item: T): Array<T> {
    const itemInArray = this.includes(item) ? item : this.find(i => i == item);
    if (!itemInArray) throw new Error(`item is not in array!`);
    
    const itemIndex = this.indexOf(itemInArray);
    this.splice(itemIndex, 1);
    return this;
}

Map.prototype.array = function<K, V>(this: Map<K, V>): [K, V][] {
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
Map.prototype.keyArr = function<K, V>(this: Map<K, V>): K[] {
    return this.array().map(([k]) => k);
}
Map.prototype.valueArr = function<K, V>(this: Map<K, V>): V[] {
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
String.prototype.toSnakeCase = function(this: string, replaceOptions: IReplacement = { replacer: ' ', replacement: '_' }) {
    return spaceReplacer(this, replaceOptions.replacer, replaceOptions.replacement)
}
String.prototype.toKebabCase = function(this: string, replaceOptions: IReplacement = { replacer: ' ', replacement: '-' }) {
    return spaceReplacer(this, replaceOptions.replacer, replaceOptions.replacement);
}
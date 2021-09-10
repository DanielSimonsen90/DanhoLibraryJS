import ElementOptions from "./Interfaces/ElementOptions";

declare global {
    interface Document {
        createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions): HTMLElementTagNameMap[K]
    }
    interface HTMLCollection {
        array(): Element[]
    }
    interface Array<T> {
        add(...items: Array<T>): this
        remove(item: T): this
    }
    interface Map<K, V> {
        array(): [K, V][]
        map<EK, EV>(callback: (value: V, key?: K, index?: number, map?: this) => [EK, EV]): Map<EK, EV>
        filter(callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): Map<K, V>
        keyArr(): Array<K>
        valueArr(): Array<V>
        find(callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): [K, V]
        includes(value: V, fromIndex?: number): boolean;
    }
    interface String {
        toPascalCase(): string;
        toSnakeCase(): string;
        toKebabCase(): string;
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
String.prototype.toSnakeCase = function(this: string, replacer?: string | RegExp) {
    return spaceReplacer(this, replacer || ' ', '_')
}
String.prototype.toKebabCase = function(this: string, replacer?: string | RegExp) {
    return spaceReplacer(this, replacer || ' ', '-');
}
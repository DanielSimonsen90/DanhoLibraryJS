# [DanhoLibraryJS](../README.md)

## Extensions

### General

```ts
interface BooleanConstructor {
    /**
     * Parses string to boolean. Will only return true if value === "true" otherwise false
     */
    parseBoolean(value: string): boolean
}

interface Document {
    /**
     * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
     * @param tagName HTMLElement tag name
     * @param options Construction options, instead of assigning values after construction
     */
    createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions): HTMLElementTagNameMap[K];
}

interface HTMLCollection {
    /**
     * Converts HTMLCollection to Element[]
     */
    array(): Element[];
}
```

### Array

```ts
interface Array<T> {
    /**
     * Pushes items to array and returns self with new items
     * @param items Items to add to array
     */
    add(...items: Array<T>): this
    /**
     * Update an item in array
     * @param old The old value or index to update
     * @param updated Updated value
     */
    update(old: T | number, updated: T): T
    /**
     * Removes item from array and returns self without item
     * @param item Item or index to remove
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
```

### Map

```ts
interface Map<K, V> {
    /**
     * Converts map into Array<[Key, Value]>
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
     * Whether or not map includes a  value (value version of Map#has)
     * @param value Value that may be includded in map
     * @param fromIndex Start looking for value from specific index+. Default: 0
     */
    includes(value: V, fromIndex?: number): boolean;
}
```

### Object

```ts
interface ObjectConstructor {
    /**
     * Destructures object into array of [property, value]
     * @param from Object to destruct
     */
    array<From = {}>(from: From): Array<keyof From, ValueOf<From>>
    /**
     * Destructures object into array of property keys
     * @param from Object to destruct
     */
    keysOf<From = {}>(from: From): Array<keyof From>
}
```

### String

```ts
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
    /**
     * String.substring but accepting negative numbers to cut from length
     * @param start Start of string. 0 indexed, if negative number, subtracts number from length
     * @param end End of string. 0 indexed, if negative number, substracts number from length
     */
    clip(start: number, end?: number): string
}
```

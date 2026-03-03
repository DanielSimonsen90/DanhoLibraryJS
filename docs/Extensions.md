# [DanhoLibraryJS](../README.md)

## Extensions

Extensions add new methods to native JavaScript types and interfaces.

### Array

#### Instance Methods

```ts
interface Array<T> {
  /**
   * Pushes items to array and returns self with new items
   * @param items Items to add to array
   */
  add(...items: Array<T>): this;

  /**
   * Update an item in array
   * @param old The old value, index, or finder function to locate item to update
   * @param updated Updated value
   */
  update(old: T | number | ((item: T, index: number, self: Array<T>) => boolean), updated: T): T;

  /**
   * Removes item from array and returns self without item
   * @param item Item or index to remove
   */
  remove(item: T | number): Array<T>;

  /**
   * Returns a random element from array
   */
  random(): T;

  /**
   * Shuffles array in random order
   */
  shuffle(): Array<T>;

  /**
   * Returns the first `count` elements from the array
   * @param count Number of elements to take
   */
  take(count: number): Array<T>;

  /**
   * Returns a new array with only unique elements
   */
  unique(): Array<T>;

  /**
   * Splits the array into chunks of a specified size or by a splitter function
   * @param chunkSizeOrSplitter The size of each chunk or a function that determines where to split
   */
  splitBy(chunkSizeOrSplitter: number | ((value: T, index: number, array: Array<T>) => boolean)): Array<Array<T>>;

  /**
   * Groups elements based on a key selector function
   * @param keySelector A function that selects a key for each element
   */
  groupBy<K>(keySelector: (value: T, index: number, array: Array<T>) => K): Map<K, Array<T>>;

  /**
   * For every nth element in array, execute callback
   * @param every Execute callback every nth element
   * @param callback Function to execute
   */
  nth<U>(every: number, callback: (collection: Array<T>, index: number, self: this) => U): Array<U>;

  /**
   * Joins array elements with a separator, and a different separator before the last element
   * @param separator Separator between elements (default: ',')
   * @param endSeparator Separator before last element (default: '&')
   */
  join(separator?: string, endSeparator?: string): string;

  /**
   * Orders array by comparators in ascending order
   * @param comparators Comparison functions
   */
  orderBy(...comparators: Array<(a: T, b: T) => number>): Array<T>;

  /**
   * Orders array by comparators in descending order
   * @param comparators Comparison functions
   */
  orderByDescending(...comparators: Array<(a: T, b: T) => number>): Array<T>;

  /**
   * Sorts array by object properties
   * @param properties Properties to sort by
   */
  sortByProperty(...properties: Array<keyof T>): Array<T>;
}
```

#### Static Methods

```ts
interface ArrayConstructor {
  /**
   * Forces an arrayable object into an array
   * @param arrayable The value or array to normalize
   */
  forceArray<T>(arrayable: T | Array<T>): Array<T>;
}
```

### Function

```ts
/**
 * Checks if a value is a function
 */
function is(obj: any): obj is Function;

/**
 * Resolves a functionable value (value or function that returns value)
 * @param functionable Value or function
 * @param args Arguments to pass if functionable is a function
 */
function resolveFunctionable<T, TArgs extends any[] = any[]>(functionable: T | ((...args: TArgs) => T), ...args: TArgs): T;

/**
 * Converts a functionable value into a function
 * @param functionable Value or function
 */
function forceFunction<T, TArgs extends any[] = any[]>(functionable: T | ((...args: TArgs) => T)): (...args: TArgs) => T;
```

### Map

```ts
interface Map<K, V> {
  /**
   * Converts map into Array<[Key, Value]>
   */
  array(): Array<[K, V]>;

  /**
   * Maps values into new types
   * @param callback Mapping function
   */
  map<EK, EV>(callback: (value: V, key: K, index: number, self: this) => [EK, EV]): Map<EK, EV>;

  /**
   * Filters map entries
   * @param callback Filter function
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
   * Finds first entry matching callback
   * @param callback Find function
   */
  find(callback: (value: V, key: K, index: number, self: this) => boolean): [K, V] | undefined;

  /**
   * Checks if map includes a value
   * @param value Value to search for
   * @param fromIndex Start looking from specific index
   */
  includes(value: V, fromIndex?: number): boolean;
}
```

### Number

```ts
interface Number {
  /**
   * Formats number with thousand and decimal separators
   * @param separators Custom separators for thousand and decimal (optional)
   */
  toSeparationString(separators?: Partial<{ thousand: string; decimal: string }>): string;

  /**
   * Converts number to Roman numeral (1-3999)
   */
  toRomanNumeral(): string;
}
```

### Object

#### Static Methods

```ts
interface ObjectConstructor {
  /**
   * Destructures object into array of [property, value]
   * @param from Object to destruct
   */
  array<From extends {} = {}>(from: From): Array<[keyof From, ValueOf<From>]>;
  /**
   * Destructures object into array of property keys or values depending on selector
   * @param from Object to destruct
   * @param selector Selects whether to return keys or values
   */
  array<From extends {} = {}>(from: From, selector: 'keys'): Array<keyof From>;
  /**
   * Destructures object into array of property keys or values depending on selector
   * @param from Object to destruct
   * @param selector Selects whether to return keys or values
   */
  array<From extends {} = {}>(from: From, selector: 'values'): Array<ValueOf<From>>;

  /**
   * Returns array of object keys with proper typing
   * @param from Object to get keys from
   */
  keysOf<From = {}>(from: From): Array<keyof From>;

  /**
   * Object with property filter methods by type
   * Methods: getStrings, getNumbers, getBooleans, getUndefineds, getNulls,
   *          getObjects, getFunctions, getAnys, getDates, getRegExps,
   *          getPromises, getArrays, getMaps, getSets
   * @example Object.properties.getStrings(obj) // Returns object with only string properties
   */
  properties: {
      getStrings<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getNumbers<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getBooleans<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getUndefineds<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getNulls<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getObjects<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getFunctions<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getAnys<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getDates<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getRegExps<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getPromises<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getArrays<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getMaps<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
      getSets<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions): Partial<Source>;
  };
}
```

#### Standalone Functions

```ts
/**
 * Creates new object omitting specified properties
 * @param from Source object
 * @param props Properties to omit
 */
function omit<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Omit<From, Props>;

/**
 * Creates new object with only specified properties
 * @param from Source object
 * @param props Properties to pick
 */
function pick<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Pick<From, Props>;

/**
 * Returns the difference between two objects
 * @param source Source object
 * @param target Target object
 * @param exclude Properties to exclude from comparison
 */
function difference<T extends object>(source: T, target: T, ...exclude: Array<keyof T>): Partial<T>;

/**
 * Deeply combines multiple objects
 * @param objects Objects to combine
 */
function combine<T extends Record<string, any | undefined>>(...objects: Array<T | undefined>): T;

/**
 * Deep equality check for objects
 * @param a First object
 * @param b Second object
 */
function areEqual<T extends object | null>(a?: T, b?: T): boolean;

/**
 * Type guard for null or undefined
 * @param obj Value to check
 */
function isNullOrUndefined(obj: any): obj is null | undefined;
```

### String

```ts
interface String {
  /**
   * Converts string from one case to another
   * @param from Case to convert from ('camel' | 'pascal' | 'snake' | 'kebab' | 'lower' | 'upper')
   * @param to Cases to convert to, can chain multiple conversions
   */
  convertCase(from: Case, ...to: Array<Case>): string;

  /**
   * Truncates string to specified length with optional ellipsis
   * @param length Maximum length of string
   * @param ellipsis String to append if truncated (default: '...')
   */
  truncate(length: number, ellipsis?: string): string;
}
```

#### Standalone Function

```ts
/**
 * Converts a string's case
 * @param value String to convert
 * @param from Source case format
 * @param to Target case format(s)
 */
function convertCase(value: string, from: Case, ...to: Array<Case>): string;
```

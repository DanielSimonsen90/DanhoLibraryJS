# [DanhoLibraryJS](../README.md)

## Types

### General

```ts
/**
 * Used for HTMLElement.append in ElementOptions, Document.createElement.
 * IElement accepts HTML Elements or HTML-like strings.
 */
type IElement = HTMLElement | string;

/**
 * string or RegExp
 */
type StringRegex = string | RegExp;

/**
 * Conditional type - If Boolean is true, returns True, otherwise False
 */
type If<Boolean extends boolean, True, False> = Boolean extends true ? True : False;

/**
 * Return types of T
 */
type ValueOf<T> = T[keyof T];
```

### Able

```ts
/**
 * Value can be either T or a function that returns T
 */
type Functionable<T, Args extends any[] = []> = T | ((...args: Args) => T);

/**
 * Value can be either T or a Promise that resolves to T
 */
type Promiseable<T> = T | Promise<T>;

/**
 * Value can be T or null
 */
type Nullable<T> = T | null;

/**
 * Removes null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

### Array

```ts
/**
 * Item is single or multiple (T or Array<T>)
 */
type Arrayable<T> = T | Array<T>;

/**
 * Item is single or wrapped in single-element array
 */
type SingleArrayable<T> = T | [T];

/**
 * Extracts type from Array<T>
 */
type TFromArray<T> = T extends Array<infer U> ? U : never;
```

### BetterTypes

```ts
/**
 * Construct a type with the properties of Type except for those in Properties
 */
type BetterOmit<Type, Properties extends keyof Type> = Omit<Type, Properties>;

/**
 * Extract from From those types that are assignable to Properties
 */
type BetterExtract<From, Properties extends From> = Extract<From, Properties>;

/**
 * Partial type but with required properties
 */
type PartialExcept<From, Properties extends keyof From> = Partial<From> & Required<Pick<From, Properties>>;
```

### C# Types

```ts
/**
 * GUID string
 */
type Guid = string;

/**
 * TimeSpan string format
 */
type TimeSpanType = string;
```

### Date

```ts
/**
 * Long month names
 */
type LongMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

/**
 * Short month names
 */
type ShortMonth = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';

/**
 * Month name (long or short)
 */
type Month = LongMonth | ShortMonth;

/**
 * Short day names
 */
type ShortDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

/**
 * Long day names
 */
type LongDay = `${'Mon' | 'Tues' | 'Wednes' | 'Thurs' | 'Fri' | 'Satur' | 'Sun'}day`;

/**
 * Day name (long or short)
 */
type Day = ShortDay | LongDay;

/**
 * Constructor type for DanhoDate
 */
type DanhoDateConstructor = TimeProperties | string | number | Date;

/**
 * Time properties object
 */
type TimeProperties<Plural extends boolean = false> = Record<Plural extends true ? `${TimeKeys}s` : TimeKeys, number>;

/**
 * What properties to include when using TimeSpan.toString()
 */
type TimeSpanFormat = Partial<TransformType<TimeProperties<true>, number, boolean>>;
```

### Events

```ts
/**
 * Default event handler mapper. Object with properties that are arrays
 */
type BaseEvent<Keys extends string, Types extends Array<any>> = Record<Keys, Types>;

/**
 * Event handler type
 */
type EventHandler<
    Events extends BaseEvent<string, Array<any>> = BaseEvent<string, Array<any>>,
    Event extends keyof Events = keyof Events,
    ReturnType = any
> = (...args: Events[Event]) => ReturnType;
```

### Function

```ts
/**
 * Changes return type of a function
 */
type NewReturnType<Func extends (...args: any[]) => any, NewReturn> = 
    Func extends (...args: infer Args) => any ? (...args: Args) => NewReturn : never;

/**
 * Wraps function return type in Promise
 */
type PromisedReturn<Func extends (...args: any[]) => any> = 
    Func extends (...args: infer Args) => infer Return ? (...args: Args) => Promise<Return> : never;

/**
 * Removes all function properties from type
 */
type NoFunctions<T> = { [K in keyof T]: T[K] extends Function ? never : T[K] };
```

### Object

```ts
/**
 * Type's properties are all ReturnType
 */
type AllPropsAre<ReturnType> = {
    [key: string]: ReturnType;
};
```

### PropertiesWith

```ts
/**
 * Filters all properties from From that have the return type of Type
 */
type PropertiesWith<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? Key : never]: From[Key];
};

/**
 * Filters all properties from From that don't have the return type of Type
 */
type PropertiesWithout<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? never : Key]: From[Key];
};

/**
 * Gets keys that appear in all types in the array
 */
type GetRepeatedKeys<Types extends Array<any>> = 
    Types extends [infer First, ...infer Rest]
        ? Rest extends Array<any>
            ? keyof First & GetRepeatedKeys<Rest>
            : keyof First
        : never;

/**
 * Filters types that have specific properties
 */
type ModelWithProps<T, TProps extends (keyof T | string)> = T extends Record<TProps, any> ? T : never;
```

### String

```ts
/**
 * Autocomplete type - allows string literal autocomplete while still accepting any string
 */
type Autocomplete<T> = T | (string & {});
```

### TransformTypes

```ts
/**
 * Converts Start types to Switch types in From type
 */
type TransformType<From, Start, Switch> = {
    [Key in keyof From]: From[Key] extends Start ? Switch : From[Key];
};

/**
 * Returns object with properties matching BaseType with types of NewType
 */
type TransformTypes<From, BaseType, NewType> = Record<keyof {
    [Key in keyof From as From[Key] extends BaseType ? Key : never]: Key;
}, NewType>;

/**
 * Converts object to JSON-serializable type (removes functions, Date -> string, etc.)
 */
type Json<T> = {
    [K in keyof T]: T[K] extends Function
        ? never
        : T[K] extends Date
        ? string
        : T[K] extends object
        ? Json<T[K]>
        : T[K];
};
```

### Store

```ts
/**
 * Reducer function for Store state updates
 */
type Reducer<State, Types extends Record<string, any[]>, Action extends keyof Types> = 
    (state: State, ...args: Types[Action]) => State;
```
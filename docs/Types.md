# [DanhoLibraryJS](../README.md)

## Types

### General

``` ts
/**
 * Type's properties are ReturnType
 */
export type AllPropsAre<ReturnType> = {
    [key: string]: ReturnType
}

/**
 * Item is single or multiple
 */
export type Arrayable<T> = T | Array<T>;

/**
 * Used for HTMLElement.append in ElementOptions, Document.createProperElement.
 * IElement accepts HTML Elements or HTMl-like strings.
 * 
 * @see HTMLElement.append
 * @see Document.createProperElement
 */
export type IElement = HTMLElement | string;

/**
 * string or RegExp.. pretty self-explanatory
 */
export type StringRegex = string | RegExp;

/**
 * Return types of T
 */
export type ValueOf<T> = T[keyof T];
```

### BetterTypes

```ts
/**
 * Construct a type with the properties of Type except for those in type Properties.
 */
export type BetterOmit<Type, Properties extends keyof Type> = Omit<Type, Properties>;
/**
 * Extract from From those types that are assignable to Properties
 */
export type BetterExtract<From, Properties extends From> = Extract<From, Properties>;
```

### Events

```ts
/**
 * Default eventhandler mapper. Object with properties that are arrays
 */
 export type BaseEvent<Keys extends string, Types extends Array<any>> = Record<Keys, Types>;

 /**
  * Eventhandler type for:
  * @see EventCollection
  * @borrows BaseEvent
  */
 export type EventHandler<
     Events extends BaseEvent<string, Array<any>> = BaseEvent<string, Array<any>>,
     Event extends keyof Events = keyof Events,
     ReturnType = any
 > = (...args: Events[Event]) => ReturnType;
```

### PropertiesWith

```ts
/**
 * Filters all properties from From that has the return type of Type
 */
export type PropertiesWith<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? Key : never]: From[Key]
}
export default PropertiesWith;

/**
 * Fitlers all properties from From that don't have the return type of Type
 */
export type PropertiesWithout<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? never : Key]: From[Key]
}
```

### Time

```ts
/**
 * Object interface with keys above to number values. If Plural is true, all properties ends with 's'
 */
export type TimeProperties<Plural extends boolean = false> = Record<Plural extends true ? `${TimeKeys}s` : TimeKeys, number>

/**
 * What properties to include when using TimeSpan.toString(format: TimeSpanFormat): string
 */
export type TimeSpanFormat = Partial<TransformType<TimeProperties<true>, number, boolean>>
```

### TransformTypes

```ts
/**
 * Converts Start types to Switch types in From type
 */
export type TransformType<From, Start, Switch> = {
    [Key in keyof From]: From[Key] extends Start ? Switch : From[Key]
}

/**
 * Returns object with properties matching BaseType with types of NewType
 */
export type TransformTypes<From, BaseType, NewType> = Record<keyof { 
    [Key in keyof From as From[Key] extends BaseType ? Key : never]: Key 
}, NewType>
```

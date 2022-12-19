# [DanhoLibraryJS](../README.md)

## Types

### General

``` ts
/**
 * Type's properties are ReturnType
 */
type AllPropsAre<ReturnType> = {
    [key: string]: ReturnType
}

/**
 * Item is single or multiple
 */
type Arrayable<T> = T | Array<T>;

/**
 * If Condition is true, Then, Else... pretty self-explanatory
 */
type If<Condition, Then, Else> = Condition extends true ? Then : Else;

/**
 * Used for HTMLElement.append in ElementOptions, Document.createProperElement.
 * IElement accepts HTML Elements or HTMl-like strings.
 * 
 * @see HTMLElement.append
 * @see Document.createProperElement
 */
type IElement = HTMLElement | string;

/**
 * string or RegExp.. pretty self-explanatory
 */
type StringRegex = string | RegExp;

/**
 * Return types of T
 */
type ValueOf<T> = T[keyof T];
```

### BetterTypes

```ts
/**
 * Construct a type with the properties of Type except for those in type Properties.
 */
type BetterOmit<Type, Properties extends keyof Type> = Omit<Type, Properties>;
/**
 * Extract from From those types that are assignable to Properties
 */
type BetterExtract<From, Properties extends From> = Extract<From, Properties>;
```

### Events

```ts
/**
 * Default eventhandler mapper. Object with properties that are arrays
 */
 type BaseEvent<Keys extends string, Types extends Array<any>> = Record<Keys, Types>;

 /**
  * Eventhandler type for:
  * @see EventCollection
  * @borrows BaseEvent
  */
 type EventHandler<
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
type PropertiesWith<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? Key : never]: From[Key]
}
default PropertiesWith;

/**
 * Fitlers all properties from From that don't have the return type of Type
 */
type PropertiesWithout<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? never : Key]: From[Key]
}
```

### Time

```ts
/**
 * Type used to construct DanhoDate.
 * @Data Partial TimeProperties except years & months
 * @DateFormat string as dd/MM/yyyy
 */
type DanhoDateConstructor = Data | DateFormat | number | Date;

/**
 * Object interface with keys above to number values. If Plural is true, all properties ends with 's'
 */
type TimeProperties<Plural extends boolean = false> = Record<Plural extends true ? `${TimeKeys}s` : TimeKeys, number>

/**
 * What properties to include when using TimeSpan.toString(format: TimeSpanFormat): string
 */
type TimeSpanFormat = Partial<TransformType<TimeProperties<true>, number, boolean>>
```

### TransformTypes

```ts
/**
 * Converts Start types to Switch types in From type
 */
type TransformType<From, Start, Switch> = {
    [Key in keyof From]: From[Key] extends Start ? Switch : From[Key]
}

/**
 * Returns object with properties matching BaseType with types of NewType
 */
type TransformTypes<From, BaseType, NewType> = Record<keyof { 
    [Key in keyof From as From[Key] extends BaseType ? Key : never]: Key 
}, NewType>
```

### Store
```ts
/**
 * Reducer function to map wanted parameters when using @see Store.on(action, reducer);
 */
type Reducer<State, Types extends Record<string, any[]>, Action extends keyof Types> = (state: State, ...args: Types[Action]) => State
```
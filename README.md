# DanhoLibraryJS

[By DanielSimonsen90 // Danhosaur](https://github.com/DanielSimonsen90)

## Vanilla

```html
<script src="https://cdn.jsdelivr.net/gh/DanielSimonsen90/DanhoLibraryJS@latest/dist/index.js"></script>
```

## Node

```cmd
npm install danholibraryjs
```

```js
import { ... } from 'DanhoLibraryJS';
```

## Documentation

### Extensions

```ts
class Document {
    /**
     * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
     * @param tagName HTMLElement tag name
     * @param options Construction options, instead of assigning values after construction
     */
    createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions): HTMLElementTagNameMap[K];
}

class HTMLCollection {
    /**
     * Converts HTMLCollection to Element[]
     */
    array(): Element[];
}

class Array<T> {
    /**
     * Pushes items to array and returns self with new items
     * @param items Items to add to array
     */
    add(...items: Array<T>): this
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

interface Map<K, V> {
    /**
     * Converts map into Array<[Key, Value]>
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
    filter(callback: (value: V, key?: K, index?: number, self?: this) => boolean): Map<K, V>
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
    find(callback: (value: V, key?: K, index?: number, self?: this) => boolean): [K, V] | undefined
    /**
     * Whether or not map includes a  value (value version of Map#has)
     * @param value Value that may be includded in map
     * @param fromIndex Start looking for value from specific index+. Default: 0
     */
    includes(value: V, fromIndex?: number): boolean;
}
interface String {
    /**Uppercases first letter of string*/
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
     * @param start Start of string. 0 indexed
     * @param end End of string. 0 indexed, if negative number, substracts number from length
     */
    clip(start: number, end?: number): string
}
```

### Functions

```ts
/**
 * Copies value to clipboard and alerts a response, if response is defined
 * @param value Value to clipboard
 * @param response Alerts if response is given
 */
async function CopyToClipboard(value: string, response?: string): Promise<void>;

/**
 * Gets the value of "property" in type "type" from query "query"
 * Basically, you can get your --color-primary from :root
 * 
 * @param property Name of the property to get
 * @param type Type of the property to parse
 * @param query Query to get the element that has the property
 * @returns Property value converted to type
*/
function GetCSSProperty<Type extends keyof CSSReturnTypes>(property: string, type: Type, query = ":root"): CSSReturnTypes[Type];

/**
 * Create HTMLEvent object from function
 * @param name Name of the event
 * @param handler Handler for the event
 * @returns Parameters as object
 */
function HTMLEvent<
    Event extends keyof HTMLElementEventMap, 
    ReturnType extends any
>(name: Event, handler: (event: HTMLElementEventMap[Event]) => ReturnType): { 
    name: Event, 
    handler: (event: HTMLElementEventMap[Event]) => ReturnType 
}

/**
 * Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param query The query selector for Document.querySelector
 * @param currentPageClasses Class(es) to append header's "a" elements
 * 
 * @borrows Document.querySelector
 */
function SetNavigationSelected(query: string, ...currentPageClasses: string[]): void;

/**
 * Converts input into milliseconds
 * @param input Input to convert to ms. 1s | 2m | 3h | 1M | 60000
 * @returns Millisecond value of input
 */
function ms(input: TimeDelay): number
```

### Classes

```ts
/**
 * Base event for @see EventEmitter
 * @borrows EventHandler 
 * @borrows BaseEvent
 */
class Event<
    Event extends BaseEvent<string, Array<any>>,
    Name extends keyof Events = keyof Events
> {
    /**
     * Base event for @see EventEmitter, @borrows EventHandler
     * @param name Name of event
     * @param listeners Listeners/Handlers to execute when emitted
     */
    constructor(name: Name, ...listeners: Array<EventHandler<Events, Name>>);

    /**Name of event*/
    public name: Name;
    /**Listener limit - default: 0 */
    public limit = 0;
    /**Number of times event was emitted - default: 0*/
    public get runs: number;
    /**Timestamp of last emit - default: null*/
    public get lastEmitted: Date;

    /**
     * Emits event and returns array of responses
     * @param args Arguments required for event listeners
     * @returns Return values of listeners' returns
     */
    public emit(...args: Events[Name]): any[];
    /**
     * Adds listener to listeners array and returns self with new listener added
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public on(listener: EventHandler<Events, Name>, prepend = false): this
    /**
     * Like Event#on, adds listener to listeners array and returns self with new listener added, however removes listener once emitted
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public once(listener: EventHandler<Events, Name>, prepend = false): this;
    /**
     * Returns true or false, depending if event includes listener
     * @param listener Listener to test
     * @returns True of false, depending if event includes listener
     */
    public includes(listener: EventHandler<Events, Name>): boolean;
    /**
     * Removes listener from internal listeners array
     * @param listener Listener to remove. If none specified, all will be removed
     * @param throwNotFoundError Throw error if listener isn't in listeners array - default: false
     * @returns this, without listener
     * 
     * @throws NotFound, if throwNotFoundError is true, and internal listeners array doesn't include listener provided
     */
    public off(listener?: EventHandler<Events, Name>, throwNotFoundError = false): this;
}

/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 * @borrows Event
 * @borrows BaseEvent
 */
class EventCollection<Events extends BaseEvent<string, Array<any>>> {
    /**Events to add in construction - Map<eventName, eventHandlers>*/
    constructor(events?: Map<keyof Events, EventHandler<Events>>);
    
    /**Amount of events stored*/
    public get size: number

    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    public has<EventName extends keyof Events>(event: EventName): boolean
    /**
     * Returns all event handlers for event name. T is return type for event
     * @param event Event name
     * @returns Event object stored
     */
    public get<EventName extends keyof Events>(event: EventName): Event<Events, EventName> 
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @param once Whether or not handler only should run once or all times
     * @returns this
     */
    public add<EventName extends keyof Events>(name: EventName, handler: EventHandler<Events, keyof Events>, once = false): this
    /**
     * @summary clear(): Clears all events
     * @summary clear("all", myEventHandler): Removes myEventHandler from all events that have it
     * @summary clear("myEvent"): Clears all handlers tied to "myEvent"
     * @summary clear("myEvent", myEventHandler): Removes myEventHandler from "myEvent"
     * 
     * @param name Event name | "all"
     * @param handler Specific handler to remove. If left blank, all handlers in name will be removed
     * @returns this
     */
    public clear<EventName extends keyof Events>(name: EventName | 'all' = 'all', handler?: EventHandler): this
    /**
     * Emits event matching name, and provides args param to saved handers. Returns result from all handlers
     * @param name Event name
     * @param args Arguments for event handlers
     * @returns Result from all handlers
     */
    public emit<Event extends keyof Events>(name: Event, ...args: Events[Event]): any[];
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     * 
     * @throws Unknown event, if event name isn't recognized
     */
    public limit<Event extends keyof Events>(eventName: 'all' | Event, limit: number): this
}

/**
 * Traditional Node.js EventEmitter for vanilla JavaScript
 * @borrows EventCollection
 * @borrows BaseEvent
 * @borrows EventHandler
 */
class EventEmitter<Events extends BaseEvent<string, Array<any>>> {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<keyof Events, EventHandler<Events>>);

    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    on<Return extends any, Event extends keyof Events>(event: Event, listener: EventHandler<Events, Event, Return>): this;
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    once<Return extends any, Event extends keyof Events>(event: Event, listener: EventHandler<Events, Event, Return>): this;
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    off<Return extends any, Event extends keyof Events>(event: Event | 'all' = 'all', listener?: EventHandler<Events, Event, Return>): this;
    /**
     * Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @fires event
     * @returns Array of listeners' reponses
     */
    emit<Return extends any, Event extends keyof Events>(event: Event, ...args: Events[Event]): Array<Return>;
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param event: Specific event to limit, or by default, 'all'
     * @param limit Limit of events to keep. If you want to limit amount of events saved, use 'all'.
     * @returns this with the new limit
     */
    public limit<Event extends keyof Events>(event: 'all' | Event, limit: number): this;
}

/**
 * Time utility class
 * @borrows TimeDelay
 * @borrows ms
 */
class Time {
    /*
     * Millisecond in milliseconds (I know that sounds silly but it makes sense later on?)
     */
    public static get millisecond: number;
    /*
     * Second in milliseconds
     */
    public static get second: number;
    /*
     * Minute in milliseconds
     */
    public static get minute: number;
    /*
     * Hour in milliseconds
     */
    public static get hour: number;
    /*
     * Day in milliseconds
     */
    public static get day: number;
    /*
     * Week in milliseconds
     */
    public static get week: number;
    /*
     * Month in milliseconds
     */
    public static get month: number;
    /*
     * Year in milliseconds
     */
    public static get year: number;
    /*
     * Average month in milliseconds
     */
    public static get avgMonth: number;

    /*
     * Converts TimeDelay input into milliseconds
     */
    public static ms(input: TimeDelay): number
}

/**
 * Timespan between 2 dates.
 * @borrows TimeSpanValue
 * @borrows Time
 */
class TimeSpan {
    constructor(from: TimeSpanValue, to: TimeSpanValue = Date.now());

    /*
     * Total x between dates
     */
    public years: number;
    /*
     * Total x between dates
     */
    public months: number;
    /*
     * Total x between dates
     */
    public weeks: number;
    /*
     * Total x between dates
     */
    public days: number;
    /*
     * Total x between dates
     */
    public hours: number;
    /*
     * Total x between dates
     */
    public minutes: number;
    /*
     * Total x between dates
     */
    public seconds: number;
    /*
     * Total x between dates
     */
    public milliseconds: number;

    /**
     * Get the maximum amount of months between the two dates
     * @returns Number of max amount of months that are between the two dates
     */
    public getTotalMonths(): number;
    /**
     * Get the maximum amount of weeks between the two dates
     * @returns Number of max amount of weeks that are between the two dates
     */
    public getTotalWeeks(): number;
    /**
     * Get the maximum amount of days between the two dates
     * @returns Number of max amount of days that are between the two dates
     */
    public getTotalDays(): number;
    /**
     * Get the maximum amount of hours between the two dates
     * @returns Number of max amount of hours that are between the two dates
     */
    public getTotalHours(): number;
    /**
     * Get the maximum amount of minutes between the two dates
     * @returns Number of max amount of minutes that are between the two dates
     */
    public getTotalMinutes(): number;
    /**
     * Get the maximum amount of seconds between the two dates
     * @returns Number of max amount of seconds that are between the two dates
     */
    public getTotalSeconds(): number;
    /**
     * Get the maximum amount of milliseconds between the two dates
     * @returns Number of max amount of milliseconds that are between the two dates
     */
    public getTotalMilliseconds(): number;
    
    /**
     * Start date of timespan
     */
    public from: Date;
    /**
     * End date of timespan
     */
    public to: Date;
    /**
     * Timespan is in the past
     */
    public pastTense: boolean;

    public toString(includeMs: boolean = false): string
}
```

### Interfaces

```ts
/**
 * Construction options when creating an HTML element using:
 * @see Document.createProperElement 
 * @borwwos IElement
 * @borwwos Arrayable
 */
interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    /**css classes to give the element*/
    classes?: Array<string>;
    /**attributes to give the element*/
    attributes?: Array<[string, string]>;
    /**Children of the element*/
    children?: Arrayable<IElement>;
    /**Events for the element to listen to
     * @use HTMLEvent<Event, RetrunType>(name: Event, handler: (e: Event) => ReturnType)
    */
    events?: Array<{ name: string, handler: (e: Event) => any }>
}
/**
 * Replacement tool for 
 * @see String.toSnakeCase 
 * @see String.toKebabCase
 * @borrows StringRegex
*/
interface IReplacement {
    replacer?: StringRegex,
    replacement?: string
}
```

### Types

```ts
/** Item is single or multiple */
type Arrayable<T> = T | Array<T>;

/** Event mapper is object with properties that are arrays */
type BaseEvent<Keys extends string, Types extends Array<any>>;

/** '2s' or 2000 */
type TimeDelay = number | string;

/** '1h' or new Date(new Date().setHour(new Date().getHour() + 1)) (god i hate dates in javascript I swear I'm making my own someday) */
type TimeSpanvalue = number | Date;

/**
 * Eventhandler type for:
 * @see EventCollection
 * @borrows BaseEvent
 */
type EventHandler<
    Events extends BaseEvent<string, Array<any>> = BaseEvent<string, Array<any>>, 
    Event extends keyof Events,
    ReturnType = any
> = (args: Events[Event]) => ReturnType;

/**
 * Used for HTMLElement.append in ElementOptions, Document.createProperElement.
 * IElement accepts HTML Elements or HTMl-like strings.
 * 
 * @see HTMLElement.append
 * @see Document.createProperElement
 */
type IElement = HTMLElement | string;

/**Used for @see IReplacement*/
type StringRegex = string | RegExp;

/*
 * Filters all properties from From that has the return type of Type
 */
type PropertiesWith<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? Key : never]: From[Key]
}

/*
 * Filters all properties from From that don't have the return type of Type
 */
type PropertiesWithout<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? never : Key]: From[Key]
}
```

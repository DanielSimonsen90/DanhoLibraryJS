# DanhoLibraryJS
[By DanielSimonsen90 // Danhosaur](https://github.com/DanielSimonsen90)

### Vanilla
```html
<script src="https://cdn.jsdelivr.net/gh/DanielSimonsen90/DanhoLibraryJS@latest/dist/index.js"></script>
```

### Node
```
npm install danholibraryjs
```

```js
import { ... } from 'DanhoLibraryJS';
```

### Documentation
#### Extensions
```ts
class Document {
    /**
     * Creates an element like Document#createElement, however with construction options to assign values in construction instead of after construction.
     * @param tagName HTMLElement tag name
     * @param options Construction options, instead of assigning values after construction
     */
    createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions<K>): HTMLElementTagNameMap[K];
}

class HTMLCollection {
    /**Converts HTMLCollection to Element[]*/
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
     * @param item Item to remove
     */
    remove(item: T): this
}

interface Map<K, V> {
    /**Converts map into Array<[Key, Value]>*/
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
    /**Converts map into array of keys*/
    keyArr(): Array<K>
    /**Converts map into array of values*/
    valueArr(): Array<V>
    /**
     * Returns first [key, value] match to callback param
     * @param callback Callbacking function to find KeyValuePair
     */
    find(callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): [K, V]
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
}
```

#### Functions
```ts
/**
 * Copies value to clipboard and alerts a response, if response is defined
 * @param value Value to clipboard
 * @param response Alerts if response is given
 */
async function CopyToClipboard(value: string, response?: string): Promise<void>;

/**
 * Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param query The query selector for Document.querySelector
 * @param currentPageClasses Class(es) to append header's "a" elements
 * 
 * @borrows Document.querySelector
 */
function SetNavigationSelected(query: string, ...currentPageClasses: string[]): void;
```

#### Classes
```ts
/**Base event for @see EventEmitter, @borrows EventHandler*/
class Event<ReturnType = any> {
    /**
     * Base event for @see EventEmitter, @borrows EventHandler
     * @param name Name of event
     * @param listeners Listeners/Handlers to execute when emitted
     */
    constructor(name: string, ...listeners: Array<EventHandler<ReturnType>>);

    /**Name of event*/
    public name: string;
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
    public emit(...args: any[]): any[];
    /**
     * Adds listener to listeners array and returns self with new listener added
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public on(listener: EventHandler<ReturnType>, prepend = false): this
    /**
     * Like Event#on, adds listener to listeners array and returns self with new listener added, however removes listener once emitted
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public once(listener: EventHandler<ReturnType>, prepend = false): this;
    /**
     * Returns true or false, depending if event includes listener
     * @param listener Listener to test
     * @returns True of false, depending if event includes listener
     */
    public includes(listener: EventHandler<ReturnType>): boolean;
    /**
     * Removes listener from internal listeners array
     * @param listener Listener to remove
     * @param throwNotFoundError Throw error if listener isn't in listeners array - default: false
     * @returns this, without listener
     * 
     * @throws NotFound, if throwNotFoundError is true, and internal listeners array doesn't include listener provided
     */
    public off(listener: EventHandler<ReturnType>, throwNotFoundError = false): this;
}

class EventCollection {
    /**
     * Collection of Events from @see EventEmitter
     * @borrows EventHandler
     * @borrows Event
     */
    /**Events to add in construction - Map<eventName, eventHandlers>*/
    constructor(events?: Map<string, EventHandler[]>);
    /**Amount of events stored*/
    readonly size: number;
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    has(event: string): boolean;
    /**
     * Returns all event handlers for event name. T is return type for event
     * @param event Event name
     * @returns Event object stored
     */
    get<T = any>(event: string): Event<T>
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @param once Whether or not handler only should run once or all times
     * @returns this
     */
    add(name: string, handler: EventHandler, once = false): this;
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
    clear(name?: string | "all", handler?: EventHandler): this;
    /**
     * Emits event matching name, and provides args param to saved handers. Returns result from all handlers
     * @param name Event name
     * @param args Arguments for event handlers
     * @returns Result from all handlers
     */
    emit(name: string, ...args: any[]): any[];
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     * 
     * @throws Unknown event, if event name isn't recognized
     */
    limit(event: 'all' | string, limit: number): this
}

/**Traditional Node.js EventEmitter in vanilla JavaScript*/
class EventEmitter {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<string, EventHandler[]>);

    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    on<ReturnType = any>(event: string, listener: EventHandler<ReturnType>): this;
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    once(event: string, listener: EventHandler): this;
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    off(event: string = 'all', listener?: EventHandler): this;
    /**
     * Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @fires event
     * @returns Array of listeners' reponses
     */
    emit<ReturnType = any>(event: string, ...args: any[]): ReturnType[];
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param event: Specific event to limit, or by default, 'all'
     * @param limit Limit of events to keep. If you want to limit amount of events saved, use 'all'.
     * @returns this with the new limit
     */
    public limit(event: 'all' | string, limit: number): this;
}
```

#### Interfaces
```ts
/**Options for creating a proper HTML element*/
interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    /**css classes to give the element*/
    classes?: string[];
    /**attributes to give the element*/
    attributes?: [string, string][];
    /**Children of the element*/
    children?: HTMLElementTagNameMap[K][];
    /**Events for the element to listen to
     * @borrows EventHandler
     */
    events?: Array<{ name: string, handlers: EventHandler[] }>
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

#### Types
```ts
/**
 * Eventhandler type for:
 * @see EventCollection
 */
type EventHandler<ReturnType = any> = (...args: any[]) => ReturnType;

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
```
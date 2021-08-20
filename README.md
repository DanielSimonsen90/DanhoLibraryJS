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
## Extensions
```ts
class Document {
    /**Creates a simple element with the additions of ElementOptions*/
    createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions<K>): HTMLElementTagNameMap[K];
}

class HTMLCollection {
    /**Converts HTMLCollection to Array*/
    array(): Element[];
}

class Array<T> {
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
```

## Interfaces
```ts
/**Options for creating a proper HTML element*/
interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    /**css classes to give the element*/
    classes?: string[];
    /**attributes to give the element*/
    attributes?: [string, string][];
    /**Children of the element*/
    children?: HTMLElementTagNameMap[K][];
}
```

## Types
```ts
/**
 * Eventhandler type for:
 * @see EventCollection
 */
type EventHandler = (...args: any[]) => any;
```

## Classes
```ts
class EventCollection {
    /**
     * Collection of Events from @see EventEmitter
     * @borrows EventHandler
     */
    constructor();
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    has(event: string): boolean;
    /**
     * Returns all event handlers for event name
     * @param event Event name
     * @returns All event handlers for event name
     */
    get(event: string): EventHandler[];
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    add(name: string, handler: EventHandler): this;
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
}

/**Traditional Node.js EventEmitter in vanilla JavaScript*/
class EventEmitter {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor();

    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    on(event: string, listener: EventHandler): this;
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
    emit(event: string, ...args: any[]): any[];
}
```

## Functions
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
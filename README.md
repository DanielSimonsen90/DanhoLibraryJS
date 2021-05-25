# DanhoLibraryJS

To use:

```html
<script src="https://cdn.jsdelivr.net/gh/DanielSimonsen90/DanhoLibraryJS@latest/dist/index.js"></script>
```

```ts
//#region Extensions

class Document {
    /**Creates a simple element with the additions of ElementOptions*/
    createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions<K>): HTMLElementTagNameMap[K];
}

class HTMLCollection {
    /**Converts HTMLCollection to Array*/
    array(): Element[];
}

class Map<K, V> {
    /**Converts Map<K, V> to KeyValuePair<K, V>[]*/
    array(): KeyValuePair<K, V>[];
    /**Maps the map to another type of map*/
    map<EndTypeKey, EndTypeValue>(callback: (value: V, key?: K, map?: Map<K, V>) => KeyValuePair<EndTypeKey, EndTypeValue>): Map<EndTypeKey, EndTypeValue>;
    /**Filters Map to a new map depending on callback*/
    filter(callback: (value: V, key?: Key, map?: Map<K, V>) => boolean): Map<K, V>;
}

//#endregion

//#region Helpers 

function toMap<K, V>(arr: KeyValuePair<K, V>[]): Map<K, V>;

//#endregion

//#region Interfaces

/**Options for creating a proper HTML element*/
interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    /**css classes to give the element*/
    classes?: string[];
    /**attributes to give the element*/
    attributes?: [string, string][];
    /**Children of the element*/
    children?: HTMLElementTagNameMap[K][];
}

//#endregion

//#region Types

/**Callback function for EventHandler*/
type EventHandler = (...args: any[]) => any;
/**Collection of Events from EventEmitter*/

//#endregion

//#region Classes

class EventCollection {
    constructor();
    private events;
    private setEvent;
    /**Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection*/
    has(event: string): boolean;
    /**Returns all event handlers for event name
     * @param event Event name
     * @returns All event handlers for event name*/
    get(event: string): EventHandler[];
    /**Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this*/
    add(name: string, handler: EventHandler): this;
    /**@summary clear(): Clears all events
     * @summary clear("all", myEventHandler): Removes myEventHandler from all events that have it
     * @summary clear("myEvent"): Clears all handlers tied to "myEvent"
     * @summary clear("myEvent", myEventHandler): Removes myEventHandler from "myEvent"
     *
     * @param name Event name | "all"
     * @param handler Specific handler to remove. If left blank, all handlers in name will be removed
     * @returns this*/
    clear(name?: string | "all", handler?: EventHandler): this;
}

/**Traditional Node.js EventEmitter in vanilla JavaScript*/
class EventEmitter {
    constructor();
    private events;
    /**Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this*/
    on(event: string, listener: EventHandler): this;
    /**Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this*/
    once(event: string, listener: EventHandler): this;
    /**Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this*/
    remove(event?: string, listener?: EventHandler): this;
    /**Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @returns Array of listeners' reponses*/
    emit(event: string, ...args: any[]): any[];
}

/**Simple KeyValuePair from C# to JavaScript: Only has .key and .value typed after K and V
 * @typedef K KeyType
 * @typedef V ValueType*/
class KeyValuePair<K, V> {
    constructor(key: K, value: V);
    key: K;
    value: V;
}

//#endregion

//#region Global functions

/**Copies value onto the clipboard
 * @param input Input as type="text"
 * @param value value to copy ontp clipboard
 * @param response Additional response to alert*/
function CopyToClipboard(input: HTMLTextAreaElement, value: string, response?: string): void;

/**Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param currentPageClasses Class(es) to append header's "a" elements*/
function SetNavigationSelected(...currentPageClasses: string[]): void;

//#endregion
```
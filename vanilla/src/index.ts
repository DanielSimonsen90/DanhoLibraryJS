//#region Extensions
Document.prototype.createProperElement = function<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions<K>) {
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
HTMLCollection.prototype.array = function() {
    let result = new Array<Element>();

    for (let i = 0; i < this.length; i++) {
        result.push(this.item(i));
    }
    return result;
}
Array.prototype.remove = function<T>(item: T): Array<T> {
    let itemInArray = this.includes(item) ? item : this.find(i => i == item);
    if (!itemInArray) throw new Error(`item is not in array!`);
    
    let itemIndex = this.indexOf(itemInArray);
    this.splice(itemIndex, 1);
    return this;
}
Map.prototype.array = function<K, V>(): KeyValuePair<K, V>[] {
    let result = new Array<KeyValuePair<K, V>>();
    for (const [value, key] of this) {
        result.push(new KeyValuePair<K, V>(key, value));
    }
    return result;
}
Map.prototype.map = function<K, V, EndTypeKey, EndTypeValue>(
    callback: (value: V, key?: K, map?: Map<K, V>) => 
    KeyValuePair<EndTypeKey, EndTypeValue>): Map<EndTypeKey, EndTypeValue> {
    return toMap(this.array().map(callback));
}
Map.prototype.filter = function<K, V>(callback: (value: V, key?: K, map?: Map<K, V>) => boolean): Map<K, V> {
    return toMap(this.array().filter(callback));
}
function toMap<K, V>(arr: KeyValuePair<K, V>[]) {
    return arr.reduce((result, { key, value }) => result.set(key, value), new Map<K, V>());
}
//#endregion

//#region Interfaces
/**
 * Options for creating a proper HTML element
 */
interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    /**
     * css classes to give the element
     */
    classes?: string[],
    /**
     * attributes to give the element
     */
    attributes?: [string, string][],
    /**
     * Children of the element
     */
    children?: HTMLElementTagNameMap[K][]
}
//#endregion

//#region Types
/**
 * Callback function for EventHandler
 */
type EventHandler = (...args: any[]) => any;
//#endregion

//#region Classes
/**
 * Collection of Events from EventEmitter
 */
class EventCollection {
    constructor() {
        this.events = new Map<string, EventHandler[]>();
    }

    private events: Map<string, EventHandler[]>;
    private setEvent(name: string, ...handlers: EventHandler[]): this {
        this.events.set(name, [...(this.events.has(name) ? this.events.get(name) : []), ...handlers])
        return this;
    }
    
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    public has(event: string): boolean { 
        return this.events.has(event); 
    }
    /**
     * Returns all event handlers for event name
     * @param event Event name
     * @returns All event handlers for event name
     */
    public get(event: string): EventHandler[] { 
        return this.events.get(event); 
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    public add(name: string, handler: EventHandler): this { 
        return this.setEvent(name, handler); 
    }
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
    public clear(name: string | "all" = 'all', handler?: EventHandler): this {
        if (name.toLowerCase() == 'all' && handler == null) this.events.clear();                                             //clear(): Clears all events
        else if (name.toLowerCase() == 'all' && handler) this.events = (() => {                                                     //clear("all", myEventHandler): Removes the "myEventHandler" handler from all events
            let events = this.events.array().map(({ key, value }) => value.includes(handler) && key);
            this.events.forEach((v, k) => 
                events.includes(k) && 
                this.events.set(k, this.events
                    .get(k)
                    .filter(_v => !v.includes(_v))
            ));

            return this.events;
        })();
        else if (name.toLowerCase() != "all" && handler == null) this.events.delete(name);                                          //clear("myEvent"): Clears All handlers tied to "myEvent"
        else if (name.toLowerCase() != 'all' && handler) this.events.set(name, this.events.get(name).filter(h => h != handler));    //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
        return this;
    }
}

/**
 * Traditional Node.js EventEmitter in vanilla JavaScript
 */
class EventEmitter {
    constructor() {
        this.events = new EventCollection();
    }

    private events: EventCollection;
    
    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    public on(event: string, listener: EventHandler): this {
        this.events.add(event, listener);
        return this;
    }
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    public once(event: string, listener: EventHandler): this {
        let callback = () => {
            listener(listener.arguments);
            this.remove(event, listener);
        };

        this.events.add(event, callback as EventHandler);
        return this;
    }
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    public remove(event: string = "all", listener?: EventHandler): this {
        this.events.clear(event, listener);
        return this;
    }
    /**
     * Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @returns Array of listeners' reponses
     */
    public emit(event: string, ...args: any[]): any[] {
        return this.events.get(event).map(listener => listener(...args));
    }
}

/**
 * Simple KeyValuePair from C# to JavaScript: Only has .key and .value typed after K and V
 * @typedef K KeyType
 * @typedef V ValueType  
 */
class KeyValuePair<K, V> {
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    public key: K;
    public value: V;
}
//#endregion

//#region Global Functions
/**
 * Copies value onto the clipboard 
 * @param input Input as type="text"
 * @param value value to copy ontp clipboard
 * @param response Additional response to alert
 */
function CopyToClipboard(input: HTMLTextAreaElement, value: string, response?: string) {
    //Give the website body the new input variable
    document.body.appendChild(input);

    //Input's value is the item/string we're copying
    input.value = value;

    //Select the value (sort of like crtl + a)
    input.select();

    //Run the copy command
    document.execCommand("copy");

    //yeet the input element
    input.remove();

    if (response) alert(response);
}
/**
 * Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param currentPageClasses Class(es) to append header's "a" elements
 */
function SetNavigationSelected(...currentPageClasses: string[]) {
    let header = document.querySelector('header');
    let children = header.children.array().filter(c => c.tagName === 'a') as HTMLAnchorElement[];
    let currentPage = document.location.href;

    children.forEach(gc => {
        if (gc.href != currentPage) gc.classList.remove(...currentPageClasses);
        else gc.classList.add(...currentPageClasses);
    })
    

}
//#endregion
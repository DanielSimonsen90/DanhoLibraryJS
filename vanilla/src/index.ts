export {}

//#region Extensions
declare global {
    interface Document {
        createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions<K>): HTMLElementTagNameMap[K]
    }
    interface HTMLCollection {
        array(): Element[]
    }
    interface Array<T> {
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
}

Document.prototype.createProperElement = function<K extends keyof HTMLElementTagNameMap>(this: Document, tagName: K, options?: ElementOptions<K>) {
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
HTMLCollection.prototype.array = function(this: HTMLCollection) {
    let result = new Array<Element>();

    for (let i = 0; i < this.length; i++) {
        result.push(this.item(i));
    }
    return result;
}
Array.prototype.remove = function<T>(this: Array<T>, item: T): Array<T> {
    let itemInArray = this.includes(item) ? item : this.find(i => i == item);
    if (!itemInArray) throw new Error(`item is not in array!`);
    
    let itemIndex = this.indexOf(itemInArray);
    this.splice(itemIndex, 1);
    return this;
}
Map.prototype.array = function<K, V>(this: Map<K, V>): [K, V][] {
    let result = new Array<[K, V]>();
    for (const kvp of this) {
        result.push(kvp);
    }
    return result;
}
Map.prototype.map = function<K, V, EK, EV>(this: Map<K, V>, callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => [EK, EV]): Map<EK, EV> {
    return this.array()
        .map(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => 
            map.set(key, value), 
        new Map<EK, EV>())
}
Map.prototype.filter = function<K, V>(this: Map<K, V>, callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): Map<K, V> {
    return this.array()
        .filter(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => 
            map.set(key, value), 
        new Map<K, V>())
}
Map.prototype.keyArr = function<K, V>(this: Map<K, V>): K[] {
    return this.array().map(([k]) => k);
}
Map.prototype.valueArr = function<K, V>(this: Map<K, V>): V[] {
    return this.array().map(([_, v]) => v);
}
Map.prototype.find = function<K, V>(this: Map<K, V>, callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean) {
    return this.array().find(([k, v], i) => callback(v, k, i, this));
}
Map.prototype.includes = function<K, V>(this: Map<K, V>, item: V, fromIndex?: number) {
    return this.valueArr().includes(item, fromIndex);
}
//#endregion
//#endregion

//#region Interfaces
/**
 * Options for creating a proper HTML element
 */
export interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
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
export type EventHandler = (...args: any[]) => any;
//#endregion

//#region Classes
/**
 * Collection of Events from EventEmitter
 */
export class EventCollection {
    constructor(events?: Map<string, EventHandler[]>) {
        this.events = events || new Map<string, EventHandler[]>();
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
            let events = this.events.array().map(([event, handlers]) => handlers.includes(handler) && event);
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
export class EventEmitter {
    constructor(events?: Map<string, EventHandler[]>) {
        this.events = new EventCollection(events);
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
            this.off(event, listener);
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
    public off(event: string = "all", listener?: EventHandler): this {
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
//#endregion

//#region Global Functions
/**
 * Copies value onto the clipboard 
 * @param input Input as type="text"
 * @param value value to copy ontp clipboard
 * @param response Additional response to alert
 */
export function CopyToClipboard(input: HTMLTextAreaElement, value: string, response?: string) {
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
export function SetNavigationSelected(...currentPageClasses: string[]) {
    let header = document.querySelector('header');
    let children = header.children.array().filter(c => c.tagName === 'a') as HTMLAnchorElement[];
    let currentPage = document.location.href;

    children.forEach(gc => {
        if (gc.href != currentPage) gc.classList.remove(...currentPageClasses);
        else gc.classList.add(...currentPageClasses);
    })
}
//#endregion
//#region Extensions
Document.prototype.createProperElement = function (tagName, options) {
    let baseElement = document.createElement(tagName);
    if (!options)
        return baseElement;
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
};
HTMLCollection.prototype.array = function () {
    let result = new Array();
    for (let i = 0; i < this.length; i++) {
        result.push(this.item(i));
    }
    return result;
};
Array.prototype.remove = function (item) {
    let itemInArray = this.includes(item) ? item : this.find(i => i == item);
    if (!itemInArray)
        throw new Error(`item is not in array!`);
    let itemIndex = this.indexOf(itemInArray);
    this.splice(itemIndex, 1);
    return this;
};
Map.prototype.array = function () {
    let result = new Array();
    for (const [value, key] of this) {
        result.push(new KeyValuePair(key, value));
    }
    return result;
};
Map.prototype.map = function (callback) {
    return toMap(this.array().map(callback));
};
Map.prototype.filter = function (callback) {
    return toMap(this.array().filter(callback));
};
function toMap(arr) {
    return arr.reduce((result, { key, value }) => result.set(key, value), new Map());
}
//#endregion
//#region Classes
/**
 * Collection of Events from EventEmitter
 */
class EventCollection {
    constructor() {
        this.events = new Map();
    }
    setEvent(name, ...handlers) {
        this.events.set(name, [...(this.events.has(name) ? this.events.get(name) : []), ...handlers]);
        return this;
    }
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    has(event) {
        return this.events.has(event);
    }
    /**
     * Returns all event handlers for event name
     * @param event Event name
     * @returns All event handlers for event name
     */
    get(event) {
        return this.events.get(event);
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    add(name, handler) {
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
    clear(name = 'all', handler) {
        if (name.toLowerCase() == 'all' && handler == null)
            this.events.clear(); //clear(): Clears all events
        else if (name.toLowerCase() == 'all' && handler)
            this.events = (() => {
                let events = this.events.array().map(({ key, value }) => value.includes(handler) && key);
                this.events.forEach((v, k) => events.includes(k) &&
                    this.events.set(k, this.events
                        .get(k)
                        .filter(_v => !v.includes(_v))));
                return this.events;
            })();
        else if (name.toLowerCase() != "all" && handler == null)
            this.events.delete(name); //clear("myEvent"): Clears All handlers tied to "myEvent"
        else if (name.toLowerCase() != 'all' && handler)
            this.events.set(name, this.events.get(name).filter(h => h != handler)); //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
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
    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    on(event, listener) {
        this.events.add(event, listener);
        return this;
    }
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    once(event, listener) {
        let callback = () => {
            listener(listener.arguments);
            this.remove(event, listener);
        };
        this.events.add(event, callback);
        return this;
    }
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    remove(event = "all", listener) {
        this.events.clear(event, listener);
        return this;
    }
    /**
     * Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @returns Array of listeners' reponses
     */
    emit(event, ...args) {
        return this.events.get(event).map(listener => listener(...args));
    }
}
/**
 * Simple KeyValuePair from C# to JavaScript: Only has .key and .value typed after K and V
 * @typedef K KeyType
 * @typedef V ValueType
 */
class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
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
function CopyToClipboard(input, value, response) {
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
    if (response)
        alert(response);
}
/**
 * Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param currentPageClasses Class(es) to append header's "a" elements
 */
function SetNavigationSelected(...currentPageClasses) {
    let header = document.querySelector('header');
    let children = header.children.array().filter(c => c.tagName === 'a');
    let currentPage = document.location.href;
    children.forEach(gc => {
        if (gc.href != currentPage)
            gc.classList.remove(...currentPageClasses);
        else
            gc.classList.add(...currentPageClasses);
    });
}
//#endregion

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetNavigationSelected = exports.CopyToClipboard = exports.EventEmitter = exports.EventCollection = void 0;
//#endregion
//#region Classes
/**
 * Collection of Events from EventEmitter
 */
class EventCollection {
    constructor(events) {
        this.events = events || new Map();
    }
    events;
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
                let events = this.events.array().map(([event, handlers]) => handlers.includes(handler) && event);
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
exports.EventCollection = EventCollection;
/**
 * Traditional Node.js EventEmitter in vanilla JavaScript
 */
class EventEmitter {
    constructor(events) {
        this.events = new EventCollection(events);
    }
    events;
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
            this.off(event, listener);
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
    off(event = "all", listener) {
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
exports.EventEmitter = EventEmitter;
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
exports.CopyToClipboard = CopyToClipboard;
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
exports.SetNavigationSelected = SetNavigationSelected;
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
    for (const kvp of this) {
        result.push(kvp);
    }
    return result;
};
Map.prototype.map = function (callback) {
    return this.array()
        .map(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => map.set(key, value), new Map());
};
Map.prototype.filter = function (callback) {
    return this.array()
        .filter(([k, v], i) => callback(v, k, i, this))
        .reduce((map, [key, value]) => map.set(key, value), new Map());
};
Map.prototype.keyArr = function () {
    return this.array().map(([k]) => k);
};
Map.prototype.valueArr = function () {
    return this.array().map(([_, v]) => v);
};
Map.prototype.find = function (callback) {
    return this.array().find(([k, v], i) => callback(v, k, i, this));
};
Map.prototype.includes = function (item, fromIndex) {
    return this.valueArr().includes(item, fromIndex);
};
//#endregion

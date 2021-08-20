"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const EventCollection_1 = require("./EventCollection");
/**
 * Traditional Node.js EventEmitter for vanilla JavaScript
 */
class EventEmitter {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events) {
        this.events = new EventCollection_1.default(events);
    }
    /**
     * Internal event collection
     * @private
     */
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
        const callback = () => {
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
     * @fires event
     * @returns Array of listeners' reponses
     */
    emit(event, ...args) {
        return this.events.get(event).map(listener => listener(...args));
    }
}
exports.EventEmitter = EventEmitter;
exports.default = EventEmitter;

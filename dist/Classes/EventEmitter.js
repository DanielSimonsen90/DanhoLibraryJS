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
        this._events = new EventCollection_1.default(events);
    }
    /**@private Internal event collection*/
    _events = new EventCollection_1.default();
    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    on(event, listener) {
        this._events.add(event, listener);
        return this;
    }
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    once(event, listener) {
        this._events.add(event, listener, true);
        return this;
    }
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    off(event = "all", listener) {
        this._events.clear(event, listener);
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
        return this._events.emit(event, ...args);
    }
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param event: Specific event to limit, or by default, 'all'
     * @param limit Limit of events to keep. If you want to limit amount of events saved, use 'all'.
     * @returns this with the new limit
     */
    limit(event, limit) {
        this._events.limit(event, limit);
        return this;
    }
}
exports.EventEmitter = EventEmitter;
exports.default = EventEmitter;

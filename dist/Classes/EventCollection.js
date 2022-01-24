"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCollection = void 0;
const Event_1 = __importDefault(require("./Event"));
/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 * @borrows Event
 * @borrows BaseEvent
 */
class EventCollection {
    constructor(events) {
        this._events = !events ?
            new Map() :
            events.array().reduce((result, [event, handlers]) => result.set(event, new Event_1.default(event, ...handlers)), new Map());
    }
    /**Amount of events stored*/
    get size() {
        return this._events.size;
    }
    /**@private Internal event collection*/
    _events = new Map();
    /**@private limit of events*/
    _limit = 0;
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    has(event) {
        return this._events.has(event);
    }
    /**
     * Returns event matching event parameter
     * @param event Event name
     * @returns Event
     */
    get(event) {
        if (!this.has(event))
            return undefined;
        return this._events.get(event);
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    add(name, handler, once = false) {
        if (this._limit > 0 && this._limit + 1 > this._events.size) {
            throw new Error(`Listener limit, ${this._limit}, reached!`);
        }
        const event = this.has(name) && this.get(name);
        if (once)
            this._events.set(name, event ? event.once(handler) : new Event_1.default(name).once(handler));
        else
            this._events.set(name, event ? event.on(handler) : new Event_1.default(name, handler));
        return this;
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
        //clear(): Clears all events
        if (name.toLowerCase() == 'all' && handler == null)
            this._events.clear();
        //clear("all", myEventHandler): Removes the "myEventHandler" handler from all events
        else if (name.toLowerCase() == 'all' && handler)
            this._events = (() => {
                const eventNames = this._events.array().map(([name, event]) => event.includes(handler) && name);
                this._events.forEach((event, name) => eventNames.includes(name) &&
                    this._events.set(name, event.off(handler)));
                return this._events;
            })();
        //clear("myEvent"): Deletes myEvent from this._events
        else if (name.toLowerCase() != "all" && handler == null)
            this._events.delete(name);
        //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
        else if (name.toLowerCase() != 'all' && handler) {
            const event = this.get(name);
            if (event)
                this._events.set(name, event.off(handler));
        }
        return this;
    }
    emit(name, args) {
        const event = this.get(name);
        return event ? event.emit(args) : undefined;
    }
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     *
     * @throws Unknown event, if event name isn't recognized
     */
    limit(eventName, limit) {
        if (limit <= 0)
            return;
        if (eventName == 'all') {
            this._limit = limit;
            return this;
        }
        const event = this.get(eventName);
        if (!event)
            throw new Error(`Unknown event, ${eventName}!`);
        event.limit = limit;
        this._events.set(eventName, event);
        return this;
    }
}
exports.EventCollection = EventCollection;
exports.default = EventCollection;

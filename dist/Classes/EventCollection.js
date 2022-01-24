"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCollection = void 0;
const Event_1 = require("./Event");
/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 */
class EventCollection {
    constructor(events) {
        this._events = !events ?
            new Map() :
            events.array().reduce((result, [event, handlers]) => result.set(event, new Event_1.Event(event, handlers)), new Map());
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
     * Binds provided handlers to provided event name.
     * @private
     * @see EventCollection.add to use
     * @param name Name of the event to set
     * @param handlers Handlers to run when event is emitted
     * @returns this, with updated events
     */
    setEvent(name, prepend, ...handlers) {
        let event = new Event_1.Event(name, ...handlers);
        if (this._events.has(name)) {
            event = this._events.get(name);
            handlers.forEach(handler => event.on(handler, prepend));
        }
        this._events.set(name, new Event_1.Event(name, ...handlers));
        return this;
    }
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    has(event) {
        return this._events.has(event);
    }
    /**
     * Returns all event handlers for event name
     * @param event Event name
     * @returns All event handlers for event name
     */
    get(event) {
        return this._events.get(event);
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    add(name, handler, prepend = false) {
        return this.setEvent(name, prepend, handler);
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
        const _name = name;
        if (_name.toLowerCase() == 'all' && handler == null)
            this._events.clear(); //clear(): Clears all events
        else if (_name.toLowerCase() == 'all' && handler)
            this._events = (() => {
                this._events.forEach(e => e.off(handler));
                return this._events;
            })();
        else if (_name.toLowerCase() != "all" && handler == null)
            this._events.delete(name); //clear("myEvent"): Clears All handlers tied to "myEvent"
        else if (_name.toLowerCase() != 'all' && handler)
            this._events.set(name, this._events.get(name).off(handler)); //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
        return this;
    }
    emit(name, args) {
        return this.get(name).emit(args);
    }
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     *
     * @throws Unknown event, if event name isn't recognized
     */
    limit(event, limit) {
        if (limit <= 0)
            return;
        if (event == 'all')
            this._limit = limit;
        else if (this.has(event))
            this.get(event).limit = limit;
        else
            throw new Error(`Unknown event, ${event}!`);
        return this;
    }
}
exports.EventCollection = EventCollection;
exports.default = EventCollection;

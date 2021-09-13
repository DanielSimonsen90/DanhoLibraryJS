import EventHandler from "../Types/EventHandler";
import Event from './Event';

/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 * @borrows Event
 */
 export class EventCollection {
    constructor(events?: Map<string, EventHandler[]>) {
        this._events = !events ? 
            new Map<string, Event>() : 
            events.array().reduce((result, [event, handlers]) => 
                result.set(event, new Event(event, ...handlers)), 
            new Map<string, Event>());
    }

    /**Amount of events stored*/
    public get size() {
        return this._events.size;
    }
    /**@private Internal event collection*/
    private _events = new Map<string, Event>();
    /**@private limit of events*/
    private _limit = 0;

    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    public has(event: string): boolean { 
        return this._events.has(event); 
    }
    /**
     * Returns event matching event parameter
     * @param event Event name
     * @returns Event
     */
    public get<T = any>(event: string): Event<T> { 
        return this._events.get(event); 
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    public add(name: string, handler: EventHandler, once = false): this {
        if (this._limit > 0 && this._limit + 1 > this._events.size) {
            throw new Error(`Listener limit, ${this._limit}, reached!`);
        }

        const event = this.has(name) && this.get(name);

        if (once) this._events.set(name, event ? event.once(handler) : new Event(name).once(handler))
        else this._events.set(name, event ? event.on(handler) : new Event(name, handler));
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
    public clear(name: string | "all" = 'all', handler?: EventHandler): this {
        //clear(): Clears all events
        if (name.toLowerCase() == 'all' && handler == null) this._events.clear();           

        //clear("all", myEventHandler): Removes the "myEventHandler" handler from all events
        else if (name.toLowerCase() == 'all' && handler) this._events = (() => {
            const eventNames = this._events.array().map(([name, event]) => event.includes(handler) && name);
            this._events.forEach((event, name) => 
                eventNames.includes(name) && 
                this._events.set(name, event.off(handler)
            ));

            return this._events;
        })();

        //clear("myEvent"): Deletes myEvent from this._events
        else if (name.toLowerCase() != "all" && handler == null) this._events.delete(name);

         //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
        else if (name.toLowerCase() != 'all' && handler) this._events.set(name, this.get(name).off(handler));
        
        return this;
    }

    public emit(name: string, ...args: any[]) {
        return this.get(name).emit(...args);
    }

    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     * 
     * @throws Unknown event, if event name isn't recognized
     */
     public limit(event: 'all' | string, limit: number) {
        if (limit <= 0) return;

        if (event == 'all') this._limit = limit;
        else if (this.has(event)) this.get(event).limit = limit;
        else throw new Error(`Unknown event, ${event}!`);

        return this;
    }
}
export default EventCollection;
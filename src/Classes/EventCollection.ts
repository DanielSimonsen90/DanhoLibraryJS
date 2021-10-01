import BaseEvent from "../Interfaces/BaseEventInterface";
import EventHandler from "../Types/EventHandler";
import Event from './Event';

/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 * @borrows Event
 * @borrows BaseEvent
 */
 export class EventCollection<Events extends BaseEvent> {
    constructor(events?: Map<keyof Events, EventHandler<Events, keyof Events>[]>) {
        this._events = !events ? 
            new Map<keyof Events, Event<Events>>() : 
            events.array().reduce((result, [event, handlers]) => 
                result.set(event, new Event<Events>(event, ...handlers)), 
            new Map<keyof Events, Event<Events>>());
    }

    /**Amount of events stored*/
    public get size() {
        return this._events.size;
    }
    /**@private Internal event collection*/
    private _events = new Map<keyof Events, Event<Events>>();
    /**@private limit of events*/
    private _limit = 0;

    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    public has(event: keyof Events): boolean { 
        return this._events.has(event); 
    }
    /**
     * Returns event matching event parameter
     * @param event Event name
     * @returns Event
     */
    public get(event: keyof Events): Event<Events> { 
        return this._events.get(event); 
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    public add(name: keyof Events, handler: EventHandler<Events, keyof Events>, once = false): this {
        if (this._limit > 0 && this._limit + 1 > this._events.size) {
            throw new Error(`Listener limit, ${this._limit}, reached!`);
        }

        const event = this.has(name) && this.get(name);

        if (once) this._events.set(name, event ? event.once(handler) : new Event<Events>(name).once(handler))
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
    public clear(name: keyof Events | "all" = 'all', handler?: EventHandler<Events, keyof Events>): this {
        //clear(): Clears all events
        if ((name as string).toLowerCase() == 'all' && handler == null) this._events.clear();           

        //clear("all", myEventHandler): Removes the "myEventHandler" handler from all events
        else if ((name as string).toLowerCase() == 'all' && handler) this._events = (() => {
            const eventNames = this._events.array().map(([name, event]) => event.includes(handler) && name);
            this._events.forEach((event, name) => 
                eventNames.includes(name) && 
                this._events.set(name, event.off(handler)
            ));

            return this._events;
        })();

        //clear("myEvent"): Deletes myEvent from this._events
        else if ((name as string).toLowerCase() != "all" && handler == null) this._events.delete(name as keyof Events);

         //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
        else if ((name as string).toLowerCase() != 'all' && handler) this._events.set(name as keyof Events, this.get(name as keyof Events).off(handler));
        
        return this;
    }

    public emit<Event extends keyof Events>(name: Event, args: Events[Event]) {
        return this.get(name).emit(args);
    }

    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     * 
     * @throws Unknown event, if event name isn't recognized
     */
     public limit<Event extends keyof Events>(event: 'all' | Event, limit: number) {
        if (limit <= 0) return;

        if (event == 'all') this._limit = limit;
        else if (this.has(event)) this.get(event).limit = limit;
        else throw new Error(`Unknown event, ${event}!`);

        return this;
    }
}
export default EventCollection;
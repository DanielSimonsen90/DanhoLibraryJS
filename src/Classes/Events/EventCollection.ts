import { BaseEvent, EventHandler } from "../../Types/Events";
import Event from './Event';

/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 * @borrows Event
 * @borrows BaseEvent
 */
 export class EventCollection<Events extends BaseEvent<string, Array<any>>> {
    constructor(events?: Map<keyof Events, EventHandler<Events>>) {
        this._events = !events ? 
            new Map<keyof Events, Event<Events>>() : 
            events.array().reduce((result, [event, handlers]) => 
                result.set(event, new Event<Events>(event, handlers)), 
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
    public has<EventName extends keyof Events>(event: EventName): boolean { 
        return this._events.has(event); 
    }
    /**
     * Returns event matching event parameter
     * @param event Event name
     * @returns Event
     */
    public get<EventName extends keyof Events>(event: EventName): Event<Events, EventName> { 
        return this._events.get(event) as any; 
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    public add<EventName extends keyof Events>(name: EventName, handler: EventHandler<Events, keyof Events>, once = false): this {
        if (this._limit > 0 && this._limit + 1 > this._events.size) {
            throw new Error(`Listener limit, ${this._limit}, reached!`);
        }

        const event = (this.has(name) && this.get(name)) || new Event(name);
        this._events.set(name, event.on(handler, once) as any); 
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
    public clear<EventName extends keyof Events>(name: EventName | 'all' = 'all', handler?: EventHandler): this {
        const _name = name as string;

        if (_name.toLowerCase() == 'all' && handler == null) this._events.clear();                                      //clear(): Clears all events
        else if (_name.toLowerCase() == 'all' && handler) this._events = (() => {                                       //clear("all", myEventHandler): Removes the "myEventHandler" handler from all events
            this._events.forEach(e => e.off(handler))
            return this._events;
        })();
        else if (_name.toLowerCase() != "all" && handler == null) this._events.delete(name);                            //clear("myEvent"): Clears All handlers tied to "myEvent"
        else if (_name.toLowerCase() != 'all' && handler) this._events.set(name, this._events.get(name)!.off(handler));  //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
        return this;
    }

    public emit<Event extends keyof Events>(name: Event, ...args: Events[Event]) {
        return this.get(name)?.emit(...args);
    }

    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     * 
     * @throws Unknown event, if event name isn't recognized
     */
     public limit<Event extends keyof Events>(eventName: 'all' | Event, limit: number) {
        if (limit <= 0) return;
        
        if (eventName == 'all') {
            this._limit = limit;
            return this;
        }
        
        const event = this.get(eventName);
        if (!event) throw new Error(`Unknown event, ${eventName as string}!`);

        event.limit = limit;
        this._events.set(eventName, event as any);
        return this;
    }
}
export default EventCollection;
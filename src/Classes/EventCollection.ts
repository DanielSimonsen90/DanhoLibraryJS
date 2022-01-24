import BaseEvent from "../Interfaces/BaseEventInterface";
import EventHandler from "../Types/EventHandler";
import { Event } from "./Event";

/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
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
     * Binds provided handlers to provided event name.
     * @private
     * @see EventCollection.add to use
     * @param name Name of the event to set
     * @param handlers Handlers to run when event is emitted
     * @returns this, with updated events
     */
    private setEvent<EventName extends keyof Events, ReturnType extends any>(name: EventName, prepend: boolean, ...handlers: Array<EventHandler<Events, EventName, ReturnType>>): this {
        let event = new Event<Events, EventName>(name, ...handlers);
        if (this._events.has(name)) {
            event = this._events.get(name) as Event<Events, EventName>;
            handlers.forEach(handler => event.on(handler, prepend));
        }
        
        this._events.set(name, new Event(name, ...handlers));
        return this;
    }
    
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    public has<EventName extends keyof Events>(event: EventName): boolean { 
        return this._events.has(event); 
    }
    /**
     * Returns all event handlers for event name
     * @param event Event name
     * @returns All event handlers for event name
     */
    public get<EventName extends keyof Events>(event: EventName): Event<Events, EventName> { 
        return this._events.get(event) as Event<Events, EventName>; 
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    public add<EventName extends keyof Events>(name: EventName, handler: EventHandler, prepend = false): this { 
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
    public clear<EventName extends keyof Events>(name: EventName | 'all' = 'all', handler?: EventHandler): this {
        const _name = name as string;

        if (_name.toLowerCase() == 'all' && handler == null) this._events.clear();                                      //clear(): Clears all events
        else if (_name.toLowerCase() == 'all' && handler) this._events = (() => {                                       //clear("all", myEventHandler): Removes the "myEventHandler" handler from all events
            this._events.forEach(e => e.off(handler))
            return this._events;
        })();
        else if (_name.toLowerCase() != "all" && handler == null) this._events.delete(name);                            //clear("myEvent"): Clears All handlers tied to "myEvent"
        else if (_name.toLowerCase() != 'all' && handler) this._events.set(name, this._events.get(name).off(handler));  //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
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
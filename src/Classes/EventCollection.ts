import EventHandler from "../Types/EventHandler";

/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 */
 export class EventCollection {
     /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<string, EventHandler[]>) {
        this._events = events || new Map<string, EventHandler[]>();
    }

    /**
     * Internal event collection
     * @private
     */
    private _events: Map<string, EventHandler[]>;
    /**
     * Binds provided handlers to provided event name.
     * @private
     * @see EventCollection.add to use
     * @param name Name of the event to set
     * @param handlers Handlers to run when event is emitted
     * @returns this, with updated events
     */
    private setEvent(name: string, ...handlers: EventHandler[]): this {
        this._events.set(name, [...(this._events.has(name) ? this._events.get(name) : []), ...handlers])
        return this;
    }
    
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    public has(event: string): boolean { 
        return this._events.has(event); 
    }
    /**
     * Returns all event handlers for event name
     * @param event Event name
     * @returns All event handlers for event name
     */
    public get(event: string): EventHandler[] { 
        return this._events.get(event); 
    }
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    public add(name: string, handler: EventHandler): this { 
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
    public clear(name: string | "all" = 'all', handler?: EventHandler): this {
        if (name.toLowerCase() == 'all' && handler == null) this._events.clear();                                             //clear(): Clears all events
        else if (name.toLowerCase() == 'all' && handler) this._events = (() => {                                                     //clear("all", myEventHandler): Removes the "myEventHandler" handler from all events
            let events = this._events.array().map(([event, handlers]) => handlers.includes(handler) && event);
            this._events.forEach((v, k) => 
                events.includes(k) && 
                this._events.set(k, this._events
                    .get(k)
                    .filter(_v => !v.includes(_v))
            ));

            return this._events;
        })();
        else if (name.toLowerCase() != "all" && handler == null) this._events.delete(name);                                          //clear("myEvent"): Clears All handlers tied to "myEvent"
        else if (name.toLowerCase() != 'all' && handler) this._events.set(name, this._events.get(name).filter(h => h != handler));    //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
        return this;
    }
}
export default EventCollection;
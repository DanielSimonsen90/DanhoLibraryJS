import EventHandler from "../Types/EventHandler";
/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 */
export declare class EventCollection {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<string, EventHandler[]>);
    /**
     * Internal event collection
     * @private
     */
    private _events;
    /**
     * Binds provided handlers to provided event name.
     * @private
     * @see EventCollection.add to use
     * @param name Name of the event to set
     * @param handlers Handlers to run when event is emitted
     * @returns this, with updated events
     */
    private setEvent;
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    has(event: string): boolean;
    /**
     * Returns all event handlers for event name
     * @param event Event name
     * @returns All event handlers for event name
     */
    get(event: string): EventHandler[];
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    add(name: string, handler: EventHandler): this;
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
    clear(name?: string | "all", handler?: EventHandler): this;
}
export default EventCollection;

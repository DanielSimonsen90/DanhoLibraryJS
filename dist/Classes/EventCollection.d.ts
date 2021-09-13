import EventHandler from "../Types/EventHandler";
import Event from './Event';
/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 * @borrows Event
 */
export declare class EventCollection {
    constructor(events?: Map<string, EventHandler[]>);
    /**Amount of events stored*/
    get size(): number;
    /**@private Internal event collection*/
    private _events;
    /**@private limit of events*/
    private _limit;
    /**
     * Returns true if event is in collection
     * @param event Event name
     * @returns true if event is in collection
     */
    has(event: string): boolean;
    /**
     * Returns event matching event parameter
     * @param event Event name
     * @returns Event
     */
    get<T = any>(event: string): Event<T>;
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    add(name: string, handler: EventHandler, once?: boolean): this;
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
    emit(name: string, ...args: any[]): any[];
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     *
     * @throws Unknown event, if event name isn't recognized
     */
    limit(event: 'all' | string, limit: number): this;
}
export default EventCollection;

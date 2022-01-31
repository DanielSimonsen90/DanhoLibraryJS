import BaseEvent from "../Types/BaseEvent";
import EventHandler from "../Types/EventHandler";
import Event from './Event';
/**
 * Collection of Events from @see EventEmitter
 * @borrows EventHandler
 * @borrows Event
 * @borrows BaseEvent
 */
export declare class EventCollection<Events extends BaseEvent<string, Array<any>>> {
    constructor(events?: Map<keyof Events, EventHandler<Events>>);
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
    has<EventName extends keyof Events>(event: EventName): boolean;
    /**
     * Returns event matching event parameter
     * @param event Event name
     * @returns Event
     */
    get<EventName extends keyof Events>(event: EventName): Event<Events, EventName>;
    /**
     * Adds handler to event collection with name as key
     * @param name Event name
     * @param handler Handler for event
     * @returns this
     */
    add<EventName extends keyof Events>(name: EventName, handler: EventHandler<Events, keyof Events>, once?: boolean): this;
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
    clear<EventName extends keyof Events>(name?: EventName | 'all', handler?: EventHandler): this;
    emit<Event extends keyof Events>(name: Event, ...args: Events[Event]): any[];
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param limit Limit of events to keep
     * @returns this with the new limit
     *
     * @throws Unknown event, if event name isn't recognized
     */
    limit<Event extends keyof Events>(eventName: 'all' | Event, limit: number): this | undefined;
}
export default EventCollection;

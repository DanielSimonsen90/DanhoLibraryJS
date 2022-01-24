import EventCollection from "./EventCollection";
import EventHandler from "../Types/EventHandler";
import BaseEvent from "../Interfaces/BaseEventInterface";

/**
 * Traditional Node.js EventEmitter for vanilla JavaScript
 */
export class EventEmitter<Events extends BaseEvent<string, Array<any>>> {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<keyof Events, EventHandler<Events>>) {
        this._events = new EventCollection(events);
    }

    /**
     * Internal event collection
     * @private
     */
    private _events: EventCollection<Events>;
    
    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    public on<ReturnType extends any, Event extends keyof Events>(event: Event, listener: EventHandler<Events, Event, ReturnType>): this {
        this._events.add(event, listener);
        return this;
    }
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    public once<ReturnType extends any, Event extends keyof Events>(event: Event, listener: EventHandler<Events, Event, ReturnType>): this {
        this._events.add(event, listener, true);
        return this;
    }
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    public off<ReturnType extends any, Event extends keyof Events>(event: Event | 'all' = "all", listener?: EventHandler<Events, Event, ReturnType>): this {
        this._events.clear(event, listener);
        return this;
    }
    /**
     * Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @fires event
     * @returns Array of listeners' reponses
     */
    public emit<ReturnType extends any, Event extends keyof Events>(event: Event, ...args: Events[Event]): ReturnType[] {
        return this._events.emit(event, args);
    }

    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param event: Specific event to limit, or by default, 'all'
     * @param limit Limit of events to keep. If you want to limit amount of events saved, use 'all'.
     * @returns this with the new limit
     */
    public limit<Event extends keyof Events>(event: 'all' | Event, limit: number) {
        this._events.limit<Event>(event, limit);
        return this;
    }
}
export default EventEmitter;
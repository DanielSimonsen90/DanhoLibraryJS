import EventCollection from "./EventCollection";
import EventHandler from "../Types/EventHandler";

/**
 * Traditional Node.js EventEmitter for vanilla JavaScript
 */
export class EventEmitter {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<string, EventHandler[]>) {
        this._events = new EventCollection(events);
    }

    /**@private Internal event collection*/
    private _events = new EventCollection();
    
    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    public on<ReturnType = any>(event: string, listener: EventHandler<ReturnType>): this {
        this._events.add(event, listener);
        return this;
    }
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    public once<ReturnType = any>(event: string, listener: EventHandler<ReturnType>): this {
        this._events.add(event, listener, true);
        return this;
    }

    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    public off<ReturnType = any>(event: string = "all", listener?: EventHandler<ReturnType>): this {
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
    public emit<ReturnType = any>(event: string, ...args: any[]): ReturnType[] {
        return this._events.emit(event, ...args);
    }

    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param event: Specific event to limit, or by default, 'all'
     * @param limit Limit of events to keep. If you want to limit amount of events saved, use 'all'.
     * @returns this with the new limit
     */
    public limit(event: 'all' | string, limit: number) {
        this._events.limit(event, limit);
        return this;
    }
}
export default EventEmitter;
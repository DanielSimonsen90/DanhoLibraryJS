import EventCollection from "./EventCollection";
import EventHandler from "../Types/EventHandler";

/**
 * Traditional Node.js EventEmitter for vanilla JavaScript
 */
export class EventEmitter {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<string, EventHandler[]>) {
        this.events = new EventCollection(events);
    }

    /**
     * Internal event collection
     * @private
     */
    private events = new EventCollection();
    
    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    public on(event: string, listener: EventHandler): this {
        this.events.add(event, listener);
        return this;
    }
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    public once(event: string, listener: EventHandler): this {
        const callback = () => {
            listener(listener.arguments);
            this.off(event, listener);
        };

        this.events.add(event, callback as EventHandler);
        return this;
    }
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    public off(event: string = "all", listener?: EventHandler): this {
        this.events.clear(event, listener);
        return this;
    }
    /**
     * Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @fires event
     * @returns Array of listeners' reponses
     */
    public emit(event: string, ...args: any[]): any[] {
        return this.events.get(event).map(listener => listener(...args));
    }
}
export default EventEmitter;
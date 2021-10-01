import BaseEvent from "../Interfaces/BaseEventInterface";
import EventHandler from "../Types/EventHandler";
/**Base event for @see EventEmitter, @borrows EventHandler @borrows BaseEventInterface as BaseEvent*/
export declare class Event<Events extends BaseEvent, Name extends keyof Events = keyof Events, Params = Events[Name]> {
    /**
     * Base event for @see EventEmitter, @borrows EventHandler
     * @param name Name of event
     * @param listeners Listeners/Handlers to execute when emitted
     */
    constructor(name: Name, ...listeners: Array<EventHandler<Events, Name>>);
    /**Name of event*/
    name: Name;
    /**Listener limit - default: 0 */
    limit: number;
    /**Number of times event was emitted - default: 0*/
    get runs(): number;
    /**Timestamp of last emit - default: null*/
    get lastEmitted(): Date;
    /**@private Internal listeners array*/
    private _listeners;
    /**@private Internal runs*/
    private _runs;
    /**@private Internal lastEmitted*/
    private _lastEmitted;
    /**
     * Emits event and returns array of responses
     * @param params Arguments required for event listeners
     * @returns Return values of listeners' returns
     */
    emit(params: Params): any[];
    /**
     * Adds listener to listeners array and returns self with new listener added
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     *
     * @throws Limit error, if limit was reached
     */
    on(listener: EventHandler<Events, Name>, prepend?: boolean): this;
    /**
     * Like Event#on, adds listener to listeners array and returns self with new listener added, however removes listener once emitted
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     *
     * @throws Limit error, if limit was reached
     */
    once(listener: EventHandler<Events, Name>, prepend?: boolean): this;
    /**
     * Returns true or false, depending if event includes listener
     * @param listener Listener to test
     * @returns True of false, depending if event includes listener
     */
    includes(listener: EventHandler<Events, Name>): boolean;
    /**
     * Removes listener from internal listeners array
     * @param listener Listener to remove
     * @param throwNotFoundError Throw error if listener isn't in listeners array - default: false
     * @returns this, without listener
     *
     * @throws NotFound, if throwNotFoundError is true, and internal listeners array doesn't include listener provided
     */
    off(listener: EventHandler<Events, Name>, throwNotFoundError?: boolean): this;
}
export default Event;

import BaseEvent from "../Interfaces/BaseEventInterface";
import EventHandler from "../Types/EventHandler";

/**Base event for @see EventEmitter, @borrows EventHandler @borrows BaseEventInterface as BaseEvent*/
export class Event<
    Events extends BaseEvent,
    Name extends keyof Events = keyof Events,
    Params = Events[Name],
> {
    /**
     * Base event for @see EventEmitter, @borrows EventHandler
     * @param name Name of event
     * @param listeners Listeners/Handlers to execute when emitted
     */
    constructor(name: Name, ...listeners: Array<EventHandler<Events, Name>>) {
        this.name = name;
        this._listeners = listeners;
    }

    /**Name of event*/
    public name: Name;
    /**Listener limit - default: 0 */
    public limit = 0;
    /**Number of times event was emitted - default: 0*/
    public get runs() {
        return this._runs
    }
    /**Timestamp of last emit - default: null*/
    public get lastEmitted() {
        return this._lastEmitted;
    }

    /**@private Internal listeners array*/
    private _listeners: Array<EventHandler<Events, Name>>;
    /**@private Internal runs*/
    private _runs = 0;
    /**@private Internal lastEmitted*/
    private _lastEmitted: Date = null;

    /**
     * Emits event and returns array of responses
     * @param params Arguments required for event listeners
     * @returns Return values of listeners' returns
     */
    public emit(params: Params) {
        this._runs++;
        this._lastEmitted = new Date();
        return this._listeners.map(listener => (listener as any)(params))
    }
    /**
     * Adds listener to listeners array and returns self with new listener added
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public on(listener: EventHandler<Events, Name>, prepend = false) {
        if (this.limit > 0 && this._listeners.length + 1 > this.limit) {
            throw new Error(`Event limit, ${this.limit}, reached for event ${this.name}!`);
        }

        if (prepend) this._listeners = [listener, ...this._listeners]
        else this._listeners.add(listener);

        return this;
    }
    /**
     * Like Event#on, adds listener to listeners array and returns self with new listener added, however removes listener once emitted
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public once(listener: EventHandler<Events, Name>, prepend = false) {
        const handler = (params: Params) => {
            const result = (listener as any)(params);
            this.off(handler as any);
            return result;
        }
        this.on(handler as any, prepend);
        return this;
    }

    /**
     * Returns true or false, depending if event includes listener
     * @param listener Listener to test
     * @returns True of false, depending if event includes listener
     */
    public includes(listener: EventHandler<Events, Name>) {
        return this._listeners.includes(listener);
    }

    /**
     * Removes listener from internal listeners array
     * @param listener Listener to remove
     * @param throwNotFoundError Throw error if listener isn't in listeners array - default: false
     * @returns this, without listener
     * 
     * @throws NotFound, if throwNotFoundError is true, and internal listeners array doesn't include listener provided
     */
    public off(listener: EventHandler<Events, Name>, throwNotFoundError = false) {
        try { this._listeners.remove(listener); } 
        catch (err) { if (throwNotFoundError) throw err; }
        return this;
    }
}
export default Event;
import EventHandler from "../Types/EventHandler";

/**Base event for @see EventEmitter, @borrows EventHandler*/
export default class Event<ReturnType = any> {
    /**
     * Base event for @see EventEmitter, @borrows EventHandler
     * @param name Name of event
     * @param listeners Listeners/Handlers to execute when emitted
     */
    constructor(name: string, ...listeners: Array<EventHandler<ReturnType>>) {
        this.name = name;
        this._listeners = listeners;
    }

    /**Name of event*/
    public name: string;
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
    private _listeners: Array<EventHandler<ReturnType>>;
    /**@private Internal runs*/
    private _runs = 0;
    /**@private Internal lastEmitted*/
    private _lastEmitted: Date = null;

    /**
     * Emits event and returns array of responses
     * @param args Arguments required for event listeners
     * @returns Return values of listeners' returns
     */
    public emit(...args: any[]) {
        this._runs++;
        this._lastEmitted = new Date();
        return this._listeners.map(listener => listener(...args))
    }
    /**
     * Adds listener to listeners array and returns self with new listener added
     * @param listener Listener to add
     * @param prepend Add first (true) or last (false) - default: false
     * @returns this with listener added
     * 
     * @throws Limit error, if limit was reached
     */
    public on(listener: EventHandler<ReturnType>, prepend = false) {
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
    public once(listener: EventHandler<ReturnType>, prepend = false) {
        const handler = (...args: any[]) => {
            const result = listener(...args);
            this.off(handler);
            return result;
        }
        this.on(handler, prepend);
        return this;
    }

    /**
     * Returns true or false, depending if event includes listener
     * @param listener Listener to test
     * @returns True of false, depending if event includes listener
     */
    public includes(listener: EventHandler<ReturnType>) {
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
    public off(listener: EventHandler<ReturnType>, throwNotFoundError = false) {
        try { this._listeners.remove(listener); } 
        catch (err) { if (throwNotFoundError) throw err; }
        return this;
    }
}
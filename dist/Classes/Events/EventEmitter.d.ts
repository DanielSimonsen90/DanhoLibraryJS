import { BaseEvent, EventHandler } from '../../Types';
/**
 * Traditional Node.js EventEmitter for vanilla JavaScript
 * @borrows EventCollection
 * @borrows BaseEvent
 * @borrows EventHandler
 *
 * @example ```ts
 * import { EventEmitter } from 'danholibraryjs';
 *
 * type EventTypes = {
 *  create: [username: string, password: string],
 *  update: [id: string, user: User],
 *  delete: [id: string, reason?: string],
 * }
 *
 * const emitter = new EventEmitter<EventTypes>(new Map([
 *  ['create', (username, password) => {
 *     return { username, password };
 *  }],
 *  ['update', (id, user) => {
 *    return { id, ...user };
 *  }]
 * ]));
 *
 * const onDelete = (id: string, reason?: string) => console.log(`User ${id} was deleted because ${reason}`);
 * emitter.on('delete', onDelete);
 * emitter.emit('delete', '1', 'No longer needed');
 * emitter.off('delete', onDelete);
 * ```
 */
export declare class EventEmitter<Events extends BaseEvent<string, Array<any>>> {
    /**@param events Map<name: string, handlers: EventHandler[]>*/
    constructor(events?: Map<keyof Events, EventHandler<Events>>);
    /**@private Internal event collection*/
    private _events;
    /**
     * Adds listener to event collection, and runs listener when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    on<Return extends any, Event extends keyof Events>(event: Event, listener: EventHandler<Events, Event, Return>): this;
    /**
     * Adds listener to event collection, and runs listener once when event is emitted
     * @param event Event to handle
     * @param listener Callback function to run, when event occurs
     * @returns this
     */
    once<Return extends any, Event extends keyof Events>(event: Event, listener: EventHandler<Events, Event, Return>): this;
    /**
     * Removes listener(s) from event
     * @param event Event to get collection of listeners | "all"
     * @param listener If left null, removes all listeners tied to event, else only removes listener from event
     * @returns this
     */
    off<Return extends any, Event extends keyof Events>(event?: Event | 'all', listener?: EventHandler<Events, Event, Return>): this;
    /**
     * Emits event and runs all listeners tied to event
     * @param event Event to emit
     * @param args Arguments for the event
     * @fires event
     * @returns Array of listeners' reponses
     */
    emit<Return extends any, Event extends keyof Events>(event: Event, ...args: Events[Event]): Array<Return>;
    /**
     * Limits how many events to accept using EventEmitter#on or EventEmitter#once
     * @param event: Specific event to limit, or by default, 'all'
     * @param limit Limit of events to keep. If you want to limit amount of events saved, use 'all'.
     * @returns this with the new limit
     */
    limit<Event extends keyof Events>(event: 'all' | Event, limit: number): this;
}
export default EventEmitter;

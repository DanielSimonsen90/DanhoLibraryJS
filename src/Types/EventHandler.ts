import BaseEvent from "../Interfaces/BaseEventInterface";

/**
 * Eventhandler type for:
 * @see EventCollection
 * @borrows BaseEvent
 */
export type EventHandler<
    Events extends BaseEvent<string, Array<any>> = BaseEvent<string, Array<any>>,
    Event extends keyof Events = keyof Events,
    ReturnType = any
> = (...args: Events[Event]) => ReturnType;
export default EventHandler;
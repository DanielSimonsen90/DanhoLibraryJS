import BaseEvent from "../Interfaces/BaseEventInterface";
/**
 * Eventhandler type for:
 * @see EventCollection
 * @borrows BaseEvent
 */
export declare type EventHandler<Events extends BaseEvent, Event extends keyof Events, ReturnType = any> = (args: Events[Event]) => ReturnType;
export default EventHandler;

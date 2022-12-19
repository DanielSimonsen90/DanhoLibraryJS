/**
 * Default eventhandler mapper. Object with properties that are arrays
 */
export type BaseEvent<Keys extends string, Types extends Array<any>> = Record<Keys, Types>;
/**
 * Eventhandler type for:
 * @see EventCollection
 * @borrows BaseEvent
 */
export type EventHandler<Events extends BaseEvent<string, Array<any>> = BaseEvent<string, Array<any>>, Event extends keyof Events = keyof Events, ReturnType = any> = (...args: Events[Event]) => ReturnType;

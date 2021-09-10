/**
 * Eventhandler type for:
 * @see EventCollection
 */
export type EventHandler<ReturnType = any> = (...args: any[]) => ReturnType;
export default EventHandler;
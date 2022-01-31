/**
 * Create HTMLEvent object from function
 * @param name Name of the event
 * @param handler Handler for the event
 * @returns Parameters as object
 */
export declare function HTMLEvent<Event extends keyof HTMLElementEventMap, ReturnType extends any>(name: Event, handler: (event: HTMLElementEventMap[Event]) => ReturnType): {
    name: Event;
    handler: (event: HTMLElementEventMap[Event]) => ReturnType;
};
export default HTMLEvent;

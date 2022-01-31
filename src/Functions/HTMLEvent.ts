/**
 * Create HTMLEvent object from function
 * @param name Name of the event
 * @param handler Handler for the event
 * @returns Parameters as object
 */
export function HTMLEvent<
    Event extends keyof HTMLElementEventMap,
    ReturnType extends any
>(name: Event, handler: (event: HTMLElementEventMap[Event]) => ReturnType) {
    return { name, handler };
}
export default HTMLEvent;
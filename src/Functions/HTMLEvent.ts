export function HTMLEvent<
    Event extends keyof HTMLElementEventMap,
    ReturnType extends any
>(name: Event, handler: (event: HTMLElementEventMap[Event]) => ReturnType) {
    return { name, handler };
}
export default HTMLEvent;
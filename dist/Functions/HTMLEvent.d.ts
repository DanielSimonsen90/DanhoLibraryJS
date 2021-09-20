export declare function HTMLEvent<Event extends keyof HTMLElementEventMap, ReturnType extends any>(name: Event, handler: (event: HTMLElementEventMap[Event]) => ReturnType): {
    name: Event;
    handler: (event: HTMLElementEventMap[Event]) => ReturnType;
};
export default HTMLEvent;

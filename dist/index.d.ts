declare function toMap<K, V>(arr: KeyValuePair<K, V>[]): Map<K, V>;
interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    classes?: string[];
    attributes?: [string, string][];
    children?: HTMLElementTagNameMap[K][];
}
declare type EventHandler = (...args: any[]) => any;
declare class EventCollection {
    constructor(...events: ((name: string, ...handlers: EventHandler[]) => any[])[]);
    private events;
    private setEvent;
    has(event: string): boolean;
    get(event: string): EventHandler[];
    add(name: string, handler: EventHandler): this;
    clear(name?: string | "all", handler?: EventHandler): void;
}
declare class EventEmitter {
    constructor(...events: ((name: string, ...handlers: EventHandler[]) => any)[]);
    private events;
    on(event: string, listener: EventHandler): this;
    once(event: string, listener: EventHandler): this;
    remove(event?: string, listener?: EventHandler): this;
    emit(event: string, ...args: any[]): any[];
}
declare class KeyValuePair<K, V> {
    constructor(key: K, value: V);
    key: K;
    value: V;
}
declare function CopyToClipboard(input: HTMLTextAreaElement, value: string, response?: string): void;
declare function SetNavigationSelected(currentPageClass: string): void;

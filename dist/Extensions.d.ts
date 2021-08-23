import ElementOptions from "./Interfaces/ElementOptions";
declare global {
    interface Document {
        createProperElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions): HTMLElementTagNameMap[K];
    }
    interface HTMLCollection {
        array(): Element[];
    }
    interface Array<T> {
        remove(item: T): this;
    }
    interface Map<K, V> {
        array(): [K, V][];
        map<EK, EV>(callback: (value: V, key?: K, index?: number, map?: this) => [EK, EV]): Map<EK, EV>;
        filter(callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): Map<K, V>;
        keyArr(): Array<K>;
        valueArr(): Array<V>;
        find(callback: (value: V, key?: K, index?: number, map?: Map<K, V>) => boolean): [K, V];
        includes(value: V, fromIndex?: number): boolean;
    }
}

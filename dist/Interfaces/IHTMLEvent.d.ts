export default interface IHTMLEvent<E extends keyof HTMLElementEventMap> {
    name: E;
    handler: (e: HTMLElementEventMap[E]) => any;
}

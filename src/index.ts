//https://gist.github.com/mudge/5830382 

//#region 
type EventHandler = (...args: any[]) => any;
//#endregion

//#region Interfaces
interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    classes?: string[],
    attributes?: [string, string][],
    children?: HTMLElementTagNameMap[K][]
}
interface SimpleEvent {
    name: string,
    handler: EventHandler
}
//#endregion

//#region Classes
class EventCollection {
    constructor(...events: SimpleEvent[]) {
        this.events = new Map<string, EventHandler[]>();
        events.forEach(({ name, handler }) => this.setEvent(name, handler));
    }

    private events: Map<string, EventHandler[]>;
    private setEvent(name: string, handler: EventHandler) {
        this.events.set(name, [...(this.events.has(name) ? this.events.get(name) : []), handler])
        return this;
    }
    
    public has(event: string) { return this.events.has(event); }
    public get(event: string) { return this.events.get(event); }
    public add(name: string, handler: EventHandler) { return this.setEvent(name, handler); }
    public clear(name: string = 'all', handler?: EventHandler) {
        if (name.toLowerCase() == 'all' && handler == null) return this.events.clear();
        else if (handler == null) this.events.delete(name);
        else if (name.toLowerCase() != 'all' && handler) this.events.map((v, k) => v.includes(handler) && k)
    }
}

class EventEmitter {
    constructor(...events: SimpleEvent[]) {
        this.events = new EventCollection(...events);
    }

    public events: EventCollection;
    
    public on(event: string, listener: EventHandler) {
        this.events.add(event, listener);
    }
    public removeListener(event: string, listener: EventHandler) {
        this.events.clear()
    }
}
//#endregion

//#region Global Functions
function CopyToClipboard(input: HTMLTextAreaElement, value: string, response?: string) {
    //Give the website body the new input variable
    document.body.appendChild(input);

    //Input's value is the item/string we're copying
    input.value = value;

    //Select the value (sort of like crtl + a)
    input.select();

    //Run the copy command
    document.execCommand("copy");

    //yeet the input element
    input.remove();

    if (response) alert(response);
}
function SetNavigationSelected(currentPageClass: string) {
    let header = document.querySelector('header');
    let children = header.children.array().filter(c => c.tagName === 'a') as HTMLAnchorElement[];
    let currentPage = document.location.href;

    children.forEach(gc => {
        if (gc.href != currentPage) gc.classList.remove(currentPageClass);
        else gc.classList.add(currentPageClass);
    })
    

}
//#endregion

//#region Extensions
Document.prototype.createProperElement = function<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementOptions<K>) {
    let baseElement = document.createElement(tagName);
    if (!options) return baseElement;

    if (options.classes) {
        baseElement.classList.add(...options.classes);
    }
    
    if (options.attributes) {
        options.attributes.forEach(([attribute, value]) => baseElement.setAttribute(attribute, value));
    }

    if (options.children) {
        baseElement.append(...options.children);
    }

    return baseElement;
}
HTMLCollection.prototype.array = function() {
    let result = new Array<Element>();

    for (let i = 0; i < this.length; i++) {
        result.push(this.item(i));
    }
    return result;
}
Map.prototype.array = function<K, V>() {
    
}
Map.prototype.map = function<K, V, EndType>(callback: (value: V, key?: K, map?: Map<K, V>) => EndType) {
    return this.toArray().map(callback);
}
//#endregion
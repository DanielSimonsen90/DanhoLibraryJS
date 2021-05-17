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
interface IEventCollection {
    [eventName: string]: EventHandler[];
    listeners: Array<EventHandler>;
}
//#endregion

//#region Classes
class EventCollection implements IEventCollection {
    constructor(...events: SimpleEvent[]) {
        this.events = [...events];
    }

    [eventName: string]: {
        
    }
    listeners: EventHandler[];

    private events: SimpleEvent[];
}

class EventEmitter {
    constructor() {

    }

    public events: IEventCollection = { listeners: new Array<EventHandler>() };
    
    public on(event: string, listener: EventHandler) {
        if (!this.events[event]) this.events[event] = new Array<EventHandler>();
        this.events[event].push(listener);
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
//#endregion
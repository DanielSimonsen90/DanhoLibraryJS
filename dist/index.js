//#region Extensions
Document.prototype.createProperElement = function (tagName, options) {
    let baseElement = document.createElement(tagName);
    if (!options)
        return baseElement;
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
};
HTMLCollection.prototype.array = function () {
    let result = new Array();
    for (let i = 0; i < this.length; i++) {
        result.push(this.item(i));
    }
    return result;
};
Map.prototype.array = function () {
    let result = new Array();
    for (const [value, key] of this) {
        result.push(new KeyValuePair(key, value));
    }
    return result;
};
Map.prototype.map = function (callback) {
    return toMap(this.array().map(callback));
};
Map.prototype.filter = function (callback) {
    return toMap(this.array().filter(callback));
};
function toMap(arr) {
    return arr.reduce((result, { key, value }) => result.set(key, value), new Map());
}
//#endregion
//#region Classes
class EventCollection {
    constructor(...events) {
        this.events = new Map();
        events.forEach(callback => {
            let args = callback.arguments;
            let name = args.shift();
            this.setEvent(name, ...args);
        });
    }
    setEvent(name, ...handlers) {
        this.events.set(name, [...(this.events.has(name) ? this.events.get(name) : []), ...handlers]);
        return this;
    }
    has(event) { return this.events.has(event); }
    get(event) { return this.events.get(event); }
    add(name, handler) { return this.setEvent(name, handler); }
    clear(name = 'all', handler) {
        if (name.toLowerCase() == 'all' && handler == null)
            return this.events.clear(); //clear(): Clears all events
        else if (name.toLowerCase() == 'all' && handler)
            this.events = (() => {
                let events = this.events.array().map(({ key, value }) => value.includes(handler) && key);
                this.events.forEach((v, k) => events.includes(k) &&
                    this.events.set(k, this.events
                        .get(k)
                        .filter(_v => !v.includes(_v))));
                return this.events;
            })();
        else if (name.toLowerCase() != "all" && handler == null)
            this.events.delete(name); //clear("myEvent"): Clears All handlers tied to "myEvent"
        else if (name.toLowerCase() != 'all' && handler)
            this.events.set(name, this.events.get(name).filter(h => h != handler)); //clear("myEvent", myEventHandler): Removes the "myEventsHandler" handler from "myEvent"
    }
}
class EventEmitter {
    constructor(...events) {
        this.events = new EventCollection(...events);
    }
    on(event, listener) {
        this.events.add(event, listener);
        return this;
    }
    once(event, listener) {
        let callback = () => {
            listener(listener.arguments);
            this.remove(event, listener);
        };
        this.events.add(event, callback);
        return this;
    }
    remove(event = "all", listener) {
        this.events.clear(event, listener);
        return this;
    }
    emit(event, ...args) {
        return this.events.get(event).map(listener => listener(...args));
    }
}
class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
//#endregion
//#region Global Functions
function CopyToClipboard(input, value, response) {
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
    if (response)
        alert(response);
}
function SetNavigationSelected(currentPageClass) {
    let header = document.querySelector('header');
    let children = header.children.array().filter(c => c.tagName === 'a');
    let currentPage = document.location.href;
    children.forEach(gc => {
        if (gc.href != currentPage)
            gc.classList.remove(currentPageClass);
        else
            gc.classList.add(currentPageClass);
    });
}
//#endregion

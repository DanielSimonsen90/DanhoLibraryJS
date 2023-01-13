import { Combined } from "..";
import { EventHandler } from "../../../Types";
import { EventEmitter } from "../../Events";
import BaseDQuery, { DefaultElement } from "../dquery";

type ChildrenUpdate = 'added' | 'removed';
type MutationType<
    Root extends Omit<MutationRecordType, 'characterData'> = Omit<MutationRecordType, 'characterData'>,
    Value = Root extends 'childList' ? NodeList
    : Root extends 'attributes' ? string
    : any
> = {
    root: Root;
    life: 'added' | 'changed' | 'removed';
    previous: Value;
    value: Value;
}

export type Events<DQuery = Combined<DefaultElement, any>> = {
    [Key in keyof HTMLElementEventMap]: [event: HTMLElementEventMap[Key] & {
        target: DQuery extends Combined<infer HtmlElement, any> ? HtmlElement : Element;
    }, element: DQuery]
} & {
    unmount: [element: DQuery];

    children: [mutation: MutationType<'childList'>];
    attributes: [mutation: MutationType<'attributes'>];
}

export interface IDQueryEvents<HtmlElement extends DefaultElement> extends Pick<
    EventEmitter<Events<BaseDQuery<HtmlElement>>>, 
    'emit' | 'on' | 'once' | 'off' | 'limit'
> {
    
}

const observerEvents: Array<MutationType['root']> = ['childList', 'attributes'];
const createObserver = (
    life: MutationType['root'],
    callback: (type: MutationType) => void
) => new MutationObserver((mutations, self) => {
    for (const { target, type: root, oldValue, ...mutation } of mutations) {
        if (!(target instanceof HTMLElement)) continue;

        let type: MutationType = {
            root,
            previous: oldValue,
            life: root === 'childList' ? mutation.addedNodes ? 'added' : 'removed' : 'changed',
            value: (mutation.addedNodes || mutation.removedNodes) ?? mutation.attributeName
        };

        if (life !== type.life) continue;
        callback(type);
    }
})

export default function Events<
    HtmlElement extends DefaultElement,
    DQuery extends BaseDQuery<HtmlElement>
>(dquery: DQuery) {
    class DQueryEvents implements IDQueryEvents<HtmlElement> {
        public emitter = new EventEmitter<Events<BaseDQuery<HtmlElement>>>();
        public observers = new Map<MutationType['root'], MutationObserver>();
        #listeners = new Map<Function, Function>();
    
        #addObserverEvent(
            event: MutationType['root'], 
            bound: EventHandler<Events<BaseDQuery<HtmlElement>>, 'children' | 'attributes', any>, 
            once = false
        ) {
            if (!this.observers.has(event)) {
                this.observers.set(event, createObserver(event, bound as any));
            }

            this.observers.get(event)!.observe(dquery.htmlElement, {
                [event as string]: true,
                subtree: true
            });

            if (once) {
                this.observers.get(event)!.disconnect();
                this.observers.delete(event);
            }

            return this.emitter;
        }

        public on<Return extends unknown, Event extends keyof Events>(
            event: Event,
            listener: EventHandler<Events<BaseDQuery<HtmlElement>>, Event, Return>,
            options?: boolean | AddEventListenerOptions
        ): EventEmitter<Events<BaseDQuery<HtmlElement>>> {
            if (options && typeof options === 'object' && options.once) return this.once(event, listener, options);

            const bound = listener.bind(dquery);
            this.#listeners.set(listener, bound);

            if (observerEvents.includes(event)) {
                return this.#addObserverEvent(event, bound as any, false);
            }

            this.emitter.on('unmount', () => this.off(event, bound));
            dquery.htmlElement.addEventListener(event, bound as any, options);
            return this.emitter.on(event, bound);
        }
    
        public once<Return extends unknown, Event extends keyof Events>(
            event: Event,
            listener: EventHandler<Events<BaseDQuery<HtmlElement>>, Event, Return>,
            options?: boolean | AddEventListenerOptions
        ): EventEmitter<Events<BaseDQuery<HtmlElement>>> {
            if (observerEvents.includes(event)) {
                return this.#addObserverEvent(event, listener.bind(dquery) as any, true);
            }

            const bound = listener.bind(dquery);
            this.#listeners.set(listener, bound);

            this.emitter.on('unmount', () => this.off(event, bound));
            dquery.htmlElement.addEventListener(event, bound as any, 
                typeof options === 'object'
                    ? { ...options, once: true }
                    : options
            );

            return this.emitter.once(event, listener.bind(dquery));
        }
    
        public off<Return extends unknown, Event extends keyof Events>(
            event: Event | "all" = "all",
            listener?: EventHandler<Events<BaseDQuery<HtmlElement>>, Event, Return>
        ): EventEmitter<Events<BaseDQuery<HtmlElement>>> {
            if (observerEvents.includes(event)) {
                this.observers.get(event)!.disconnect();
                this.observers.delete(event);
            }

            if (event === 'all') {
                this.observers.forEach(observer => observer.disconnect());
                this.observers.clear();
            }

            if (listener) {
                const bound = this.#listeners.get(listener);
                dquery.htmlElement.removeEventListener(event, bound as any);
            }

            return this.emitter.off(event, listener);
        }
    
        public emit<Return extends unknown, Event extends keyof Events>(
            event: Event,
            ...args: Events<BaseDQuery<HtmlElement>>[Event]
        ): Return[] {
            if (observerEvents.includes(event)) return [];

            return this.emitter.emit(event, ...args);
        }
    
        public limit<Event extends keyof Events>(
            event: "all" | Event,
            limit: number
        ): EventEmitter<Events<BaseDQuery<HtmlElement>>> {
            return this.emitter.limit(event, limit);
        }
    }

    return Object.assign(dquery, new DQueryEvents());
}
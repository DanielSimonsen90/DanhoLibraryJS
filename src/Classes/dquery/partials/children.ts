import $, { Combined } from "..";
import { UpdateFinder } from "../../../Extensions";
import BaseDQueries from "../dqueries";
import BaseDQuery, { DefaultElement } from "../dquery";
import Selector, { SelectTypes } from "../selector";
import { DQueryValueType } from "./settings";

type Update = Combined<DefaultElement, any> | number | UpdateFinder<Combined<DefaultElement, any>>;
type AcceptedAppends = Exclude<SelectTypes, Selector | Function> | Combined<DefaultElement, any>;

export default function Children<
    HtmlElement extends DefaultElement, 
    DQuery extends BaseDQuery<HtmlElement>,
    ValueSetting extends keyof DQueryValueType
>(dquery: DQuery) {
    const updateModeIsAuto = () => (dquery as any as Combined<HtmlElement, any>).settings.updateMode === 'auto';
    const reducer = (result: Array<Combined<DefaultElement, any>>, item: AcceptedAppends) => {
        if (item instanceof BaseDQuery) {
            result.push(item as Combined<DefaultElement, any>);
        }

        if (typeof item === 'string') {
            if (!item.startsWith('<')) throw new Error(
                `[DanhoLibrary] [DQuery]: Item "${item}" is not a valid HTML element.`
            );

            const { children } = new DOMParser().parseFromString(item, 'text/html').body;
            if (!children.length) return result;

            result.push(...children.array().map(child => $(child)));
        }

        if (item instanceof Element) {
            result.push($(item));
        }

        return result;
    }
    const convertToDQueries = (items: Array<AcceptedAppends>) => items.reduce((result, item) => {
        if (item instanceof Array || item instanceof NodeList) {
            Array.from(item).forEach(element =>
                result.push(...reducer(result, element)
                    ?.filter(v => v) as Array<Combined<DefaultElement, any>>
                ));
            return result;
        }

        return reducer(result, item);

    }, new Array<Combined<DefaultElement, any>>())

    class DQueryChildren extends Array<Combined<DefaultElement, ValueSetting>> {
        constructor() {
            super();
            this.parent = dquery;
            const children = $<HtmlElement>(Array.from(dquery.htmlElement.children), 'multiple');
            // TODO: Fix this
            // @ts-ignore
            this.push(...children);
        }

        public parent: BaseDQuery<HtmlElement>;

        public override push(...items: Array<AcceptedAppends>): number {
            const dqueries = convertToDQueries(items);

            if (updateModeIsAuto()) {
                this.parent.htmlElement.append(...dqueries.map(item => item.htmlElement));
            }

            return super.push(...dqueries);
        }
        public append(...items: Array<AcceptedAppends>): Combined<DefaultElement, any> {
            this.push(...items);
            return dquery as any;
        }
        public override unshift(...items: Array<AcceptedAppends>): number {
            const dqueries = convertToDQueries(items);

            if (updateModeIsAuto()) {
                this.parent.htmlElement.prepend(...dqueries.map(item => item.htmlElement));
            }

            return super.unshift(...dqueries);
        }
        public prepend(...items: Array<AcceptedAppends>): Combined<DefaultElement, any> {
            this.unshift(...items);
            return dquery as any;
        }

        public override pop(): Combined<DefaultElement, any> | undefined;
        public override pop(amount: number): Combined<DefaultElement, any> | undefined;
        public override pop(amount: 1): Combined<DefaultElement, any> | undefined;
        public override pop(child: Combined<DefaultElement, any>): Combined<DefaultElement, any> | undefined;
        public override pop(amountOrChild: number | Combined<DefaultElement, any> = 1) {
            if (amountOrChild < 1) {
                console.warn(`[DanhoLibaryJS] [DQuery]: The amount of elements to pop must be greater than 0. [${amountOrChild}]`);
                return undefined;
            }
            if (amountOrChild instanceof BaseDQuery) {
                this.remove(amountOrChild);
                return amountOrChild;
            }

            if (amountOrChild === 1) {
                const dquery = this[this.length - 1];

                if (updateModeIsAuto()) dquery.htmlElement.remove();
                return super.pop();
            }

            const children = this.slice(this.length - amountOrChild, this.length);
            for (let i = 0; i < children.length; i++) {
                const child = children[i];

                if (updateModeIsAuto()) child.htmlElement.remove();
                super.pop()
            }

            return $<DefaultElement>(children.map(child => child.htmlElement), 'multiple');
        }

        public override update(): this;
        public override update(old: Update, update: Combined<DefaultElement, any>): Combined<DefaultElement, any>;
        public override update(old?: Update, update?: Combined<DefaultElement, any>) {
            if (old && update) return super.update(old, update);

            this.parent.htmlElement.replaceChildren(...this.map(item => item.htmlElement));
            return this;
        }
    }

    return Object.assign(dquery, new (class DQueryParent {
        #children: DQueryChildren | undefined;

        public children(): DQueryChildren;
        public children(index: number): Combined<DefaultElement, any> | undefined;
        public children(selector: SelectTypes): Combined<DefaultElement, any> | undefined;
        public children(selector: SelectTypes, expect: 'multiple'): BaseDQueries<DefaultElement>;
        public children(selector?: SelectTypes | number, expect?: 'multiple') {
            if (!this.#children) this.#children = new DQueryChildren();
            if (!selector) return this.#children;
            if (typeof selector === 'number') return this.#children.at(selector);

            const children = (expect === 'multiple' 
                ? Array.from(dquery.htmlElement.querySelectorAll(Selector.getSelectorFrom(selector).value)) 
                : dquery.htmlElement.querySelector(Selector.getSelectorFrom(selector).value)
            );
            
            return (
                !children ? undefined 
                : expect === 'multiple' && Array.isArray(children) ? $(children, expect) as BaseDQueries<DefaultElement>
                : $(Array.isArray(children) ? children[0] : children)
            );
        }
    })());
}
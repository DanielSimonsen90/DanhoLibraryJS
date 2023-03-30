import BaseDQuery, { DefaultElement } from "../dquery";
import $, { Combined, DQueries } from '../index'
import Selector, { SelectTypes } from "../selector";
import { DQueryValueType } from "./settings";

export default function DOM<
    HtmlElement extends DefaultElement,
    DQuery extends BaseDQuery<HtmlElement>,
    ValueSetting extends keyof DQueryValueType,
    Value extends DQueryValueType[ValueSetting]
>(dquery: DQuery) {
    class DQueryDOM {
        public scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void {
            dquery.htmlElement.scrollIntoView(arg);
        }

        public parent(): Combined<DefaultElement, ValueSetting>;
        public parent(selector?: SelectTypes): Combined<DefaultElement, ValueSetting> | null {
            const parent = selector
                ? dquery.htmlElement.closest(Selector.getSelectorFrom(selector).value)
                : dquery.htmlElement.parentElement;
            return parent ? $(parent) : null;
        }

        public sibling(previous: -1 | 'previous'): Combined<DefaultElement, ValueSetting> | null;
        public sibling(next: 1 | 'next'): Combined<DefaultElement, ValueSetting> | null;
        public sibling(selector: SelectTypes | number): Combined<DefaultElement, ValueSetting> | null {
            if (typeof selector === 'number' 
                || selector === 'previous' 
                || selector === 'next'
            ) {
                const sibling = selector === -1 || selector === 'previous'
                    ? dquery.htmlElement.previousElementSibling
                    : dquery.htmlElement.nextElementSibling;
                return sibling ? $(sibling) : null;
            }

            selector = Selector.getSelectorFrom(selector);
            return this.parent().find(`> ${selector.value}`);
        }

        public find(selector: SelectTypes): Combined<DefaultElement, ValueSetting> | null {
            selector = Selector.getSelectorFrom(selector);
            const element = dquery.htmlElement.querySelector(selector.value);
            return element ? $(element) : null;
        }
        public findAll(selector: SelectTypes): DQueries<DefaultElement> {
            selector = Selector.getSelectorFrom(selector);
            const elements = dquery.htmlElement.querySelectorAll(selector.value);
            return $(elements);
        }

        public get value(): Value {
            const type = (dquery as any as Combined<HtmlElement, ValueSetting>).settings.valueType;
            const value = 'value' in dquery.htmlElement
                ? dquery.htmlElement.value as string
                : undefined;

            if (!value || type === 'string') return value as Value;

            try {
                return type === 'number'
                    ? parseFloat(value) as Value
                    : Boolean(value) as Value;
            } catch (error) {
                console.error(`[DanhoLibrary] [DQuery]: Unable to parse value (${value}) of "${dquery.getSelector()}" as ${type}`, {
                    error, value, type, dquery, element: dquery.htmlElement
                });
                return undefined as Value;
            }
        }
        public set value(value: Value) {
            if (!('value' in dquery.htmlElement)) {
                if (value === undefined) return;

                Object.defineProperty(dquery.htmlElement, 'value', {
                    get: () => value?.toString(),
                    set: (value) => value.toString()
                });
            }

            if ('value' in dquery.htmlElement) {
                dquery.htmlElement.value = value?.toString();
            }
        }

        public get text(): string {
            return dquery.htmlElement.textContent || '';
        }
        public set text(text: string) {
            dquery.htmlElement.textContent = text;
        }

        public get html(): string {
            return dquery.htmlElement.innerHTML;
        }
        public set html(html: string) {
            dquery.htmlElement.innerHTML = html;
            dquery.htmlElement.attributes
        }

        public attr(): Record<string, string>;
        public attr(attribute: string): string | null;
        public attr(attribute: string, value: string): void;
        public attr(attribute?: string, value?: string) {
            if (!attribute) {
                const attributes: Record<string, string> = {};
                for (let i = 0; i < dquery.htmlElement.attributes.length; i++) {
                    const attr = dquery.htmlElement.attributes[i];
                    attributes[attr.name] = attr.value;
                }
                return attributes;
            }

            return value === undefined
                ? dquery.htmlElement.getAttribute(attribute)
                : dquery.htmlElement.setAttribute(attribute, value);
        }
    }

    return Object.assign(dquery, new DQueryDOM());
}
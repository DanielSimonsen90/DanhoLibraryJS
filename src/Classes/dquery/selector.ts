import { Arrayable } from "../../Types";
import { DefaultElement } from "./dquery";

type AttributeOptions = {
    query: 'starts' | 'ends' | 'contains' | 'equals';
    tagName?: keyof HTMLElementTagNameMap;
}
type Pseudos = (
    'first-child' | 'last-child' | `nth-child(${number})` | `nth-last-child(${number})` |
    'first-of-type' | 'last-of-type' | `nth-of-type(${number})` | `nth-last-of-type(${number})` |
    'only-child' | 'only-of-type' | 'empty' | 'not' | 'has' |
    'enabled' | 'disabled' | 'checked' | 'default' | 'optional' | 'required' | 'valid' | 'invalid' |
    'in-range' | 'out-of-range' | 'read-only' | 'read-write' | 'placeholder-shown' |
    'root' | 'target' | 'link' | 'visited' | 'active' | 'hover' | 'focus' | 'focus-within' | 'focus-visible'
)

export type SelectTypes = (
    | Arrayable<Element>
    | NodeListOf<Element>
    | Selector
    | string
    | ((options: Selector) => Selector)
)

export class Selector {
    public static getSelectorFrom(...elements: Array<SelectTypes>): Selector {
        // Replace functions with Selector: Array<Selector | string | Element>
        if (elements.some(element => element instanceof Function)) {
            elements = elements.map(element => 
                element instanceof Function 
                    ? element(new Selector()) 
                    : element
            );
        }

        // Replace Selector or string with Element: Array<Element>
        if (elements.some(element => 
            element instanceof Selector 
            || typeof element === 'string'
        )) {
            elements = Array.from(elements.map(selector => 
                selector instanceof Selector 
                || typeof selector === 'string'
                    ? document.querySelectorAll(selector.toString()) as NodeListOf<Element>
                    : selector
            )).map(selector => selector instanceof NodeList 
                ? Array.from(selector) 
                : selector
            ).flat() as Array<SelectTypes>;
        }

        if (elements.some(element => element instanceof Element)) {
            //TODO: Implement
            throw new Error(`Support for ${elements.map(element => 
                Object(element).constructor.name).join(', '
            )} not implemented.`);
        }

        return ((elements: Array<Element>) => {
            const { tagName, attributes } = elements[0];
            const selector = new Selector();

            if (elements.every(element => element.tagName === tagName)) selector.tagName(tagName);

            Array.from(attributes).filter(({ name, value }) => 
                elements.every(element => element.getAttribute(name) === value))
                    .forEach(({ name, value }) => selector.attribute(name, value));

            return selector;
        })(elements as Array<Element>);
    }

    constructor(public value: string = '') {}

    public tagName(tagName: keyof HTMLElementTagNameMap): Selector;
    public tagName(tagName: string): Selector;
    public tagName(tagName: string | keyof HTMLElementTagNameMap): Selector {
        this.value += tagName;
        return this;
    }

    //#region Attributes
    public id(id: string, options?: AttributeOptions): Selector {
        this.value += this.#getAttributeFrom('id', id, options);
        return this;
    }
    public className(className: string, options?: AttributeOptions): Selector {
        this.value += this.#getAttributeFrom('class', className, options);
        return this;
    }
    public attribute(name: string, value?: string, options?: AttributeOptions): Selector {
        this.value += this.#getAttributeFrom(name, value, options);
        return this;
    }
    public ariaLabel(label: string, options?: AttributeOptions): Selector {
        this.value += this.#getAttributeFrom('aria-label', label, options);
        return this;
    }
    public data(name: string, value?: string, options?: AttributeOptions): Selector {
        this.value += this.#getAttributeFrom(`data-${name}`, value, options);
        return this;
    }
    public role(role: string, options?: AttributeOptions): Selector {
        this.value += this.#getAttributeFrom('role', role, options);
        return this;
    }
    public type(type: string, options?: AttributeOptions): Selector {
        this.value += this.#getAttributeFrom('type', type, options);
        return this;
    }
    public name(name: string, options?: AttributeOptions): Selector {
        this.value += this.#getAttributeFrom('name', name, options);
        return this;
    }
    //#endregion

    public pseudo(pseudo: Pseudos): Selector {
        this.value += `:${pseudo}`;
        return this;
    }

    // #region New element 
    public descendant(): Selector {
        this.value += ' ';
        return this;
    }
    public sibling(): Selector {
        this.value += '~';
        return this;
    }
    public adjacent(): Selector {
        this.value += '+';
        return this;
    }
    public child(): Selector {
        this.value += '>';
        return this;
    }
    public or(): Selector {
        this.value += ', ';
        return this;
    }
    // #endregion

    #getAttributeFrom(property: string, value: string = '', options?: AttributeOptions): string {
        const { query, tagName } = options ?? {
            query: 'equals',
            tagName: '*'
        };
        const attribute = (() => {
            switch (query) {
                case 'starts': return `^="${value}"`;
                case 'ends': return `$="${value}"`;
                case 'contains': return `*="${value}"`;
                default: return `="${value}"`;
            }
        })()

        return `${tagName ?? '*'}[${property}${value ? attribute : ''}]`;
    }
    public toString(): string {
        return this.value;
    }
}
export default Selector;
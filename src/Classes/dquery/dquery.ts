import Selector, { SelectTypes } from "./selector";

export type DefaultElement = HTMLElement;
export type ConstructorOption<HtmlElement extends DefaultElement> = SelectTypes | HtmlElement;

export default class BaseDQuery<HtmlElement extends DefaultElement> {
    constructor(option: ConstructorOption<HtmlElement>) {
        const result = (
            option instanceof Element 
                ? option 
                : document.querySelector(Selector.getSelectorFrom(option).value)
        ) as HtmlElement | null;
        
        if (!result) throw new Error(`No element found for selector: ${Selector.getSelectorFrom(option).value}`);

        this.htmlElement = result;
    }

    public htmlElement: HtmlElement;

    public getSelector(): Selector {
        return Selector.getSelectorFrom(this.htmlElement);
    }
}
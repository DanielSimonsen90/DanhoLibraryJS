import $ from ".";
import BaseDQuery, { ConstructorOption, DefaultElement } from "./dquery";
import Selector from "./selector";

export default class BaseDQueries<HtmlElement extends DefaultElement> 
    extends Array<BaseDQuery<HtmlElement>> {
    constructor(option: ConstructorOption<HtmlElement>) {
        super();
        let elements: Array<BaseDQuery<HtmlElement>> = [];

        if (option instanceof Array && option.every(element => element instanceof Element)) {
            elements = option.map(element => $<HtmlElement>(element, 'single') as any);
        } else {
            const queried = document.querySelectorAll(Selector.getSelectorFrom(option).value);
            elements = Array.from(queried).map(element => $<HtmlElement>(element, 'single') as any);
        }
        this.push(...elements);
    }

    public get htmlElements(): Array<HtmlElement> {
        return this.map(element => element.htmlElement);
    }


}
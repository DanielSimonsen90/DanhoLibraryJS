import { Combined } from '..';
import BaseDQuery, { DefaultElement } from '../dquery';

type PartialElement<HtmlElement extends DefaultElement> = (
    | Element
    | string
    | BaseDQuery<HtmlElement>
)

export default function Overloads<
    HtmlElement extends DefaultElement,
    DQuery extends BaseDQuery<HtmlElement>
>(dquery: DQuery) {
    const self = dquery as any as Combined<HtmlElement, any>;

    class DQueryOverloads {
        public remove(): void;
        public remove(index: number): void;
        public remove(...elements: PartialElement<HtmlElement>[]): void;
        public remove(...elements: (number | PartialElement<HtmlElement>)[]): void {
            if (!elements.length) return dquery.htmlElement.remove();
    
            elements.forEach(element => {
                const toRemove = (
                    element instanceof Element ? element :
                    element instanceof BaseDQuery ? element.htmlElement :
                    typeof element === 'number' ? dquery.htmlElement.children[element] :
                    dquery.htmlElement.querySelector(element)
                );
                if (!toRemove) return;

                const child = self.children().find(child => child.htmlElement === toRemove);
                if (child) child.emit('unmount', child);

                toRemove.remove();
            });
        }
    }

    return Object.assign(dquery, new DQueryOverloads());
}
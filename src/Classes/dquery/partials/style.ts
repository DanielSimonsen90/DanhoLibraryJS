import BaseDQuery, { DefaultElement } from "../dquery";

type Style = Partial<CSSStyleDeclaration>;
type CSSValues = string | number;

export default function Style<
    HtmlElement extends DefaultElement, 
    DQuery extends BaseDQuery<HtmlElement>
>(dquery: DQuery) {
    class DQueryStyle {
        public style<Value extends CSSValues>(property: string, value: Value, priority?: string): Style;
        public style<Value extends CSSValues>(property: string): Value;
        public style(styles: Style): Style;
        public style(property: string | Style, value?: CSSValues, priority?: string) {
            if (typeof property === 'string') {
                if (value) {
                    dquery.htmlElement.style.setProperty(property, value.toString(), priority);
                    return dquery.htmlElement.style as Style;
                }

                value = dquery.htmlElement.style.getPropertyValue(property);
                try {
                    return parseFloat(value);
                } catch {
                    return value;
                }
            }

            Object.entries(property).forEach(([key, value]) => {
                if (value) dquery.htmlElement.style.setProperty(key, value.toString());
            });
            return dquery.htmlElement.style;
        }

        public show(): this {
            this.style('display', 'block');
            return this;
        }
        public get visible(): boolean {
            return this.style('display') !== 'none';
        }

        public hide(): this {
            this.style('display', 'none');
            return this;
        }
        public get hidden(): boolean {
            return this.style('display') === 'none';
        }

        public get width(): number {
            return dquery.htmlElement.getClientRects()[0].width;
        }
        public get height(): number {
            return dquery.htmlElement.getClientRects()[0].height;
        }
    }

    return Object.assign(dquery, new DQueryStyle());
}
import BaseDQuery, { ConstructorOption, DefaultElement } from "./dquery";
import BaseDQueries from "./dqueries";
import { DQueryValueType } from "./partials/settings";

import { Children, Classes, DOM, Events, Layer, Overloads, Settings, Style } from './partials'
import { BetterOmit } from "../../Types";

type ExtensionCallback<HtmlElement extends DefaultElement> = (dquery: BaseDQuery<HtmlElement>) => BaseDQuery<HtmlElement>;

export type Combined<HtmlElement extends DefaultElement, ValueSetting extends keyof DQueryValueType> = (
    & ReturnType<typeof Children<HtmlElement, BaseDQuery<HtmlElement>, ValueSetting>>
    & ReturnType<typeof Classes<HtmlElement, BaseDQuery<HtmlElement>>>
    & ReturnType<typeof DOM<HtmlElement, BaseDQuery<HtmlElement>, ValueSetting, DQueryValueType[ValueSetting]>>
    & ReturnType<typeof Events<HtmlElement, BaseDQuery<HtmlElement>>>
    & ReturnType<typeof Layer<HtmlElement, BaseDQuery<HtmlElement>>>
    & ReturnType<typeof Overloads<HtmlElement, BaseDQuery<HtmlElement>>>
    & ReturnType<typeof Settings<HtmlElement, BaseDQuery<HtmlElement>, ValueSetting>>
    & ReturnType<typeof Style<HtmlElement, BaseDQuery<HtmlElement>>>
);

export type DQuery<HtmlElement extends DefaultElement, ValueSetting extends keyof DQueryValueType> = (
    & Combined<HtmlElement, ValueSetting>
    & ReturnType<typeof Children<HtmlElement, Combined<HtmlElement, ValueSetting>, ValueSetting>>
    & ReturnType<typeof Classes<HtmlElement, Combined<HtmlElement, ValueSetting>>>
    & ReturnType<typeof DOM<HtmlElement, Combined<HtmlElement, ValueSetting>, ValueSetting, DQueryValueType[ValueSetting]>>
    & ReturnType<typeof Events<HtmlElement, Combined<HtmlElement, ValueSetting>>>
    & ReturnType<typeof Layer<HtmlElement, Combined<HtmlElement, ValueSetting>>>
    & ReturnType<typeof Overloads<HtmlElement, Combined<HtmlElement, ValueSetting>>>
    & ReturnType<typeof Settings<HtmlElement, BaseDQuery<HtmlElement>, ValueSetting>>
    & ReturnType<typeof Style<HtmlElement, Combined<HtmlElement, ValueSetting>>>
);

export type DQueries<HtmlElement extends DefaultElement> = (
    & BaseDQueries<HtmlElement>
)

export type Expect = 'single' | 'multiple';

type DQueryOptions<
    HtmlElement extends DefaultElement, 
    ValueSetting extends keyof DQueryValueType
> = Partial<{
    quantity: Expect;
    tagName: keyof HTMLElementTagNameMap;
} & ReturnType<
    typeof Settings<
        HtmlElement, 
        BaseDQuery<HtmlElement>,
        ValueSetting
    >
>['settings']>;

type OnDomReady = (this: Document, event: DocumentEventMap['DOMContentLoaded']) => void;
type DQueryArgument<HtmlElement extends DefaultElement> = ConstructorOption<HtmlElement> | BaseDQuery<HtmlElement> | OnDomReady;
type Selector<TagName extends keyof HTMLElementTagNameMap> = `${TagName}${'#' | '.' | '['}${string}` | TagName;

// #region dquery function definitions

// #region DQuery

// 'div' => DQuery<HTMLDivElement>
export function dquery<
    TagName extends keyof HTMLElementTagNameMap, 
    ValueSetting extends keyof DQueryValueType
>(
    selector: TagName, 
    options?: BetterOmit<DQueryOptions<HTMLElementTagNameMap[TagName], ValueSetting>, 'tagName'>
): DQuery<HTMLElementTagNameMap[TagName], ValueSetting> & '54';

// 'article p' | 'article > p' | 'article + p' | 'article ~ p' => DQuery<HtmlElement>
export function dquery<
    TagName extends keyof HTMLElementTagNameMap, 
    ValueSetting extends keyof DQueryValueType
>(
    selector: `${string} ${string}`, 
    tagName?: TagName,
    options?: BetterOmit<DQueryOptions<HTMLElementTagNameMap[TagName], ValueSetting>, 'tagName'>
): DQuery<HTMLElementTagNameMap[TagName], ValueSetting> & '71';

// 'div#id' | 'div.class' | 'div[title="test"]' | 'div[title="test"]' => DQuery<HTMLDivElement>
export function dquery<
    TagName extends keyof HTMLElementTagNameMap, 
    ValueSetting extends keyof DQueryValueType
>(
    selector: Selector<TagName>,
    options?: DQueryOptions<HTMLElementTagNameMap[TagName], ValueSetting>
): DQuery<HTMLElementTagNameMap[TagName], ValueSetting> & '81';

export function dquery<
    HtmlElement extends DefaultElement, 
    ValueSetting extends keyof DQueryValueType
>(selector: BaseDQuery<HtmlElement>): DQuery<HtmlElement, ValueSetting> & '89';

// .class | #id | [title="test"] => DQuery<HtmlElement>
export function dquery<
    HtmlElement extends DefaultElement, 
    ValueSetting extends keyof DQueryValueType
>(
    selector: Exclude<ConstructorOption<HtmlElement>, Array<Element> | NodeListOf<Element>>,
    options?: DQueryOptions<HtmlElement, ValueSetting>
): DQuery<HtmlElement, ValueSetting> & '95';

// #endregion

// #region DQueries

// 'div' => DQueries<HTMLDivElement>
export function dquery<
    TagName extends keyof HTMLElementTagNameMap
>(
    selector: TagName, 
    expect: 'multiple'
): BaseDQueries<HTMLElementTagNameMap[TagName]> & '108';

// .class | #id | [title="test"] => DQueries<HtmlElement>
export function dquery<
    HtmlElement extends DefaultElement
>(
    selector: ConstructorOption<HtmlElement>, 
    expect: 'multiple'
): BaseDQueries<HtmlElement> & '116';

// NodeList
export function dquery<
    HtmlElement extends DefaultElement,
    ValueSetting extends keyof DQueryValueType
>(
    selector: NodeListOf<Element>,
    options?: DQueryOptions<HtmlElement, ValueSetting>
): BaseDQueries<HtmlElement> & '124';

// onDomReady => void
export function dquery(callback: OnDomReady): void;

export function dquery<
    HtmlElement extends DefaultElement, 
    ValueSetting extends keyof DQueryValueType = 'undefined'
>(
    argument: DQueryArgument<HtmlElement>, 
    expect?: Expect | DQueryOptions<HtmlElement, ValueSetting>, 
    options?: DQueryOptions<HtmlElement, ValueSetting>
) {
    if (typeof argument === 'function' && !expect) return document.addEventListener('DOMContentLoaded', argument as OnDomReady);
    if (argument instanceof NodeList || Array.isArray(argument)) throw new Error('Not implemented yet.'); // TODO: Implement
    if (argument instanceof BaseDQuery) return argument as DQuery<HtmlElement, ValueSetting>;

    argument = argument as ConstructorOption<HtmlElement>;
    if (typeof expect === 'object') {
        options = expect;
        expect = options.quantity;
    }

    return expect === 'multiple' 
        ? new BaseDQueries(argument) 
        : new Array<ExtensionCallback<HtmlElement>>(Classes, Events, Children, DOM, Settings,
            Overloads /* Overloads HAS to be last */)
        .reduce((dquery, extension) => (
            extension === Settings
                ? Object.assign(extension(dquery), { settings: options })
                : extension(dquery)
        ) as DQuery<HtmlElement, ValueSetting>, new BaseDQuery(argument));
}

// #endregion

// #endregion

dquery.create = function(html: string): DQuery<HTMLElement, any> {
    return dquery(document.createElementFromString(html.trim()));
}

export default dquery;
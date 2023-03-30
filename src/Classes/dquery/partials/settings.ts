import BaseDQuery, { DefaultElement } from "../dquery";

export type UpdateMode = 'manual' | 'auto';

export type DQueryValueType = {
    'string': string;
    'number': number;
    'boolean': boolean;
    'undefined': undefined;
}

export default function Settings<
    HtmlElement extends DefaultElement,
    DQuery extends BaseDQuery<HtmlElement>,
    ValueType extends keyof DQueryValueType
>(dquery: DQuery) {
    class DQuerySettings {
        public updateMode = 'manual' as UpdateMode;
        public valueType = 'undefined' as ValueType;
    }

    return Object.assign(dquery, {
        settings: new DQuerySettings()
    });
}
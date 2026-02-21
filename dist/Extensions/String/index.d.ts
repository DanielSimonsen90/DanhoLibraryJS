import * as Case from './case.extension';
export declare const StringUtils: {
    convertCase: <TValue extends string, To extends Case.Case[], Return extends To extends [...Case.Case[], infer To_1] ? To_1 : Case.Case>(value: TValue, from: Case.Case, ...to: To) => Return extends "upper" ? Uppercase<TValue> : Return extends "lower" ? Lowercase<TValue> : Return extends "pascal" ? Capitalize<TValue> : Return extends "camel" ? Uncapitalize<TValue> : string;
};

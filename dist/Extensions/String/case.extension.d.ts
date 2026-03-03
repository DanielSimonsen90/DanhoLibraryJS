export type Case = 'camel' | 'pascal' | 'snake' | 'kebab' | 'lower' | 'upper';
declare global {
    interface String {
        /**
         * Converts string from one case to another.
         * @param from Case to convert from
         * @param to Cases to convert to, in order. If multiple cases are provided, they will be applied in order
         */
        convertCase<To extends Array<Case>, Return extends To extends [...Array<Case>, infer To] ? To : Case>(from: Case, ...to: To): (Return extends 'upper' ? Uppercase<string> : Return extends 'lower' ? Lowercase<string> : Return extends 'pascal' ? Capitalize<string> : Return extends 'camel' ? Uncapitalize<string> : string);
    }
}
export declare function convertCase<TValue extends string, To extends Array<Case>, Return extends To extends [...Array<Case>, infer To] ? To : Case>(this: TValue, from: Case, ...to: To): (Return extends 'upper' ? Uppercase<TValue> : Return extends 'lower' ? Lowercase<TValue> : Return extends 'pascal' ? Capitalize<TValue> : Return extends 'camel' ? Uncapitalize<TValue> : string);

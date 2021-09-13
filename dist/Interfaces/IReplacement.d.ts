import StringRegex from "../Types/StringRegex";
/**
 * Replacement tool for
 * @see String.toSnakeCase
 * @see String.toKebabCase
 * @borrows StringRegex
*/
export default interface IReplacement {
    replacer?: StringRegex;
    replacement?: string;
}

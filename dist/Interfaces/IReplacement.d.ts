import { StringRegex } from "../Types";
/**
 * Replacement tool for
 * @see String.toSnakeCase
 * @see String.toKebabCase
 * @borrows StringRegex
*/
export interface IReplacement {
    replacer?: StringRegex;
    replacement?: string;
}
export default IReplacement;

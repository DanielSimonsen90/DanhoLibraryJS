declare global {
    interface Array<T> {
        /**
         * Joins the elements of the array into a string, with optional custom separators.
         * @param args An array of strings or undefined values to be used as separators between elements.
         * @param separator The default separator to use between elements if args is not provided or undefined.
         * @param endSeparator The separator to use before the last element.
         * @returns A string with the joined elements.
         */
        join(args?: Array<string | undefined>, separator?: string, endSeparator?: string): string;
    }
}
export declare function join<T>(this: Array<T>, separator?: string, endSeparator?: string): string;

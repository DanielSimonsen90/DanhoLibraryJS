declare global {
    interface Array<T> {
        /**
         * Joins the elements of the array into a string, with optional custom separators.
         * @param separator The default separator to use between elements. Defaults to ','.
         * @param endSeparator The separator to use before the last element. Default is '&'.
         * @returns A string with the joined elements.
         */
        join(separator?: string, endSeparator?: string): string;
    }
}
export declare function join<T>(this: Array<T>, separator?: string, endSeparator?: string): string;

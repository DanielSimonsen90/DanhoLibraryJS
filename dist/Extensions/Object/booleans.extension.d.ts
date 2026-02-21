declare global {
    interface ObjectConstructor {
        /**
         * Returns true if objects are equal by comparing their properties and values recursively. Does not compare functions.
         * @param a First object
         * @param b Second object
         * @returns true if objects are equal, false otherwise
         */
        areEqual<T extends object | null>(a?: T, b?: T): boolean;
        /**
         * Returns true if object is empty
         * @param obj Object to check
         */
        isNullOrUndefined(obj: any): obj is null | undefined;
    }
}
export declare function areEqual<T extends object | null>(a?: T, b?: T): boolean;
export declare function isNullOrUndefined(obj: any): obj is null | undefined;

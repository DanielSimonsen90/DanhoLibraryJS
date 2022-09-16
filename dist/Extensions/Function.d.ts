declare global {
    interface Function {
        /**
         * Checks if obj is a function
         * @param obj Object to check
         */
        is(obj: any): obj is Function;
    }
}
declare function is(obj: any): obj is Function;
export declare const FunctionExtensions: {
    is: typeof is;
};
export {};

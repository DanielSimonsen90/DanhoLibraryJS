import { Functionable } from "../Types";
declare global {
    interface Function {
        /**
         * Checks if obj is a function
         * @param obj Object to check
         */
        is(obj: any): obj is Function;
        /**
         * Resolves a Functionable<T> to T, if it's a function, it will be called with the provided arguments and its return value will be returned, otherwise the value itself will be returned.
         * @param functionable The Functionable<T> to resolve
         * @param args Arguments to call the function with if functionable is a function
         */
        resolveFunctionable<T, TArgs extends any[] = any[]>(functionable: Functionable<T, TArgs>, ...args: TArgs): T;
        /**
         * Forces a Functionable<T> to be a function, if it's already a function, it will be returned as is, otherwise a function that returns the value will be returned.
         * @param functionable The Functionable<T> to force to be a function
         */
        forceFunction<T, TArgs extends any[] = any[]>(functionable: Functionable<T, TArgs>): (...args: TArgs) => T;
    }
}
export declare function is(obj: any): obj is Function;
export declare function resolveFunctionable<T, TArgs extends any[] = any[]>(functionable: Functionable<T, TArgs>, ...args: TArgs): T;
export declare function forceFunction<T, TArgs extends any[] = any[]>(functionable: Functionable<T, TArgs>): (...args: TArgs) => T;
export declare const FunctionExtensions: {
    is: typeof is;
    resolveFunctionable: typeof resolveFunctionable;
    forceFunction: typeof forceFunction;
};

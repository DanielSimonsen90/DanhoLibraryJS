declare global {
    interface Function {
        /**
         * Checks if obj is a function
         * @param obj Object to check
         */
        is(obj: any): obj is Function;
    }
}

function is(obj: any): obj is Function {
    return typeof obj === 'function';
}
Function.is = is;

export const FunctionExtensions = {
    is
};
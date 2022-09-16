import { ValueOf } from "../../Types";
import { Properties } from "./properties";
declare global {
    interface ObjectConstructor {
        /**
         * Destructures object into array of [property, value]
         * @param from Object to destruct
         */
        array<From extends {} = {}>(from: From): Array<[keyof From, ValueOf<From>]>;
        /**
         * Omits properties from object, but for some reason the correct term is "extract"
         * @param from Object to extract properties from
         * @param props Properties to extract/Omit
         */
        extract<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Omit<From, Props>;
        /**
         * Pick properties from object, but for some reason the correct term is "exclude"
         * @param from Object to exclude properties from
         * @param props Properties to exclude/pick
         */
        exclude<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Pick<From, Props>;
        /**
         * Returns true if object is empty
         * @param obj Object to check
         */
        isNullOrUndefined(obj: any): obj is null | undefined;
        /**
         * Destructures object into array of property keys
         * @param from Object to destruct
         */
        keysOf<From extends {} = {}>(from: From): Array<keyof From>;
        omit<From extends {}, Exclude extends keyof From>(from: From, ...exclude: Exclude[]): Omit<From, Exclude>;
        properties: Properties;
    }
}
declare function array<From extends {} = {}>(this: object, from: From): Array<[keyof From, ValueOf<From>]>;
declare function extract<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Omit<From, Props>;
declare function exclude<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Pick<From, Props>;
declare function isNullOrUndefined(obj: any): obj is null | undefined;
declare function keysOf<From extends {} = {}>(this: object, from: From): Array<keyof From>;
export declare const ObjectExtensions: {
    properties: Properties;
    array: typeof array;
    extract: typeof extract;
    exclude: typeof exclude;
    isNullOrUndefined: typeof isNullOrUndefined;
    keysOf: typeof keysOf;
};
export {};

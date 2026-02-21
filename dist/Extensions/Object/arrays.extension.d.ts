import { ValueOf } from "../../Types";
declare global {
    interface ObjectConstructor {
        /**
         * Destructures object into array of [property, value]
         * @param from Object to destruct
         */
        array<From extends {} = {}>(from: From): Array<[keyof From, ValueOf<From>]>;
        /**
         * Destructures object into array of property keys
         * @param from Object to destruct
         */
        keysOf<From extends {} = {}>(from: From): Array<keyof From>;
    }
}
export declare function array<From extends {} = {}>(this: object, from: From): Array<[keyof From, ValueOf<From>]>;
export declare function keysOf<From extends {} = {}>(this: object, from: From): Array<keyof From>;

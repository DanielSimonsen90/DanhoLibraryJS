import { ValueOf } from "../Types";
export {};
declare global {
    interface ObjectConstructor {
        /**
         * Destructures object into array of [property, value]
         * @param from Object to destruct
         */
        array<From = {}>(from: From): Array<[keyof From, ValueOf<From>]>;
        /**
         * Destructures object into array of property keys
         * @param from Object to destruct
         */
        keysOf<From = {}>(from: From): Array<keyof From>;
    }
}

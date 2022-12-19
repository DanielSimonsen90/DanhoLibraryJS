import { ValueOf } from "../Types";

export {};

declare global {
    interface ObjectConstructor {
        /**
         * Destructures object into array of [property, value]
         * @param from Object to destruct
         */
        array<From = {}>(from: From): Array<[keyof From, ValueOf<From>]>
        /**
         * Destructures object into array of property keys
         * @param from Object to destruct
         */
        keysOf<From = {}>(from: From): Array<keyof From>
    }
}

Object.keysOf = function<From = {}>(this: object, from: From): Array<keyof From> {
    return Object.keys(from as any) as Array<keyof From>;
}
Object.array = function<From = {}>(this: object, from: From): Array<[keyof From, ValueOf<From>]> {
    return Object.keysOf(from).map(prop => [prop, from[prop]]) as Array<[keyof From, ValueOf<From>]>;
}
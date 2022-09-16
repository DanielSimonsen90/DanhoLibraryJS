import { ValueOf } from "../../Types";
import { Properties, properties } from "./properties";

declare global {
    interface ObjectConstructor {
        /**
         * Destructures object into array of [property, value]
         * @param from Object to destruct
         */
        array<From extends {} = {}>(from: From): Array<[keyof From, ValueOf<From>]>

        /**
         * Omits properties from object, but for some reason the correct term is "extract"
         * @param from Object to extract properties from
         * @param props Properties to extract/Omit
         */
        extract<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Omit<From, Props>

        /**
         * Pick properties from object, but for some reason the correct term is "exclude"
         * @param from Object to exclude properties from
         * @param props Properties to exclude/pick
         */
        exclude<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Pick<From, Props>

        /**
         * Returns true if object is empty
         * @param obj Object to check
         */
        isNullOrUndefined(obj: any): obj is null | undefined

        /**
         * Destructures object into array of property keys
         * @param from Object to destruct
         */
        keysOf<From extends {} = {}>(from: From): Array<keyof From>

        omit<From extends {}, Exclude extends keyof From>(from: From, ...exclude: Exclude[]): Omit<From, Exclude>;

        properties: Properties
    }
}

function array<From extends {} = {}>(this: object, from: From): Array<[keyof From, ValueOf<From>]> {
    return Object.keysOf(from).map(prop => [prop, from[prop]]) as Array<[keyof From, ValueOf<From>]>;
}
Object.array = array;

function extract<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Omit<From, Props> {
    // If props are Array<keyof From>, Array<Partial<From>>, or Array<keyof From | Partial<From>>, ensure _props as Array<keyof From> 
    const _props = props.map(prop => typeof prop === "object" ? Object.keysOf(prop) : prop).flat();
    _props.forEach(prop => delete from[prop as keyof From]);
    return from;
}
Object.extract = extract;

function exclude<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Pick<From, Props> {
    // If props are Array<keyof From>, Array<Partial<From>>, or Array<keyof From | Partial<From>>, ensure _props as Array<keyof From>
    const _props = props.map(prop => typeof prop === "object" ? Object.keysOf(prop) : prop).flat();
    return Object.keysOf(from).reduce((result, prop) => {
        if (_props.includes(prop as Props)) delete result[prop];
        return result;
    }, from);
}
Object.exclude = exclude;

function isNullOrUndefined(obj: any): obj is null | undefined {
    return obj === null || obj === undefined;
}
Object.isNullOrUndefined = isNullOrUndefined;

function keysOf<From extends {} = {}>(this: object, from: From): Array<keyof From> {
    return Object.keys(from) as Array<keyof From>;
}
Object.keysOf = keysOf;

Object.properties = properties;

export const ObjectExtensions = {
    properties,
    array, extract, exclude, isNullOrUndefined, keysOf, 
};

import { ValueOf } from "../../Types";

declare global {
  interface ObjectConstructor {
    /**
     * Destructures object into array of [property, value]
     * @param from Object to destruct
     */
    array<From extends {} = {}>(from: From): Array<[keyof From, ValueOf<From>]>;
    /**
     * Destructures object into array of property keys or values depending on selector
     * @param from Object to destruct
     * @param selector Selects whether to return keys or values
     */
    array<From extends {} = {}>(from: From, selector: 'keys'): Array<keyof From>;
    /**
     * Destructures object into array of property keys or values depending on selector
     * @param from Object to destruct
     * @param selector Selects whether to return keys or values
     */
    array<From extends {} = {}>(from: From, selector: 'values'): Array<ValueOf<From>>;

    /**
     * Destructures object into array of property keys
     * @param from Object to destruct
     */
    keysOf<From extends {} = {}>(from: From): Array<keyof From>;
  }
}

export function array<From extends {} = {}>(this: object, from: From): Array<[keyof From, ValueOf<From>]>;
export function array<From extends {} = {}>(this: object, from: From, selector: 'keys'): Array<keyof From>;
export function array<From extends {} = {}>(this: object, from: From, selector: 'values'): Array<ValueOf<From>>;
export function array<From extends {} = {}>(this: object, from: From, selector?: 'keys' | 'values') {
  const entries = Object.entries(from) as Array<[keyof From, ValueOf<From>]>;
  
  switch (selector) {
    case 'keys': return entries.map(([key]) => key);
    case 'values': return entries.map(([, value]) => value);
    default: return entries;
  }
}
Object.array = array;

export function keysOf<From extends {} = {}>(this: object, from: From): Array<keyof From> {
  return Object.keys(from) as Array<keyof From>;
}
Object.keysOf = keysOf;
import { PropertiesWith, If } from '../../Types';
declare type PrimitiveMap = {
    string: string;
    number: number;
    boolean: boolean;
    undefined: undefined;
    null: null;
    object: object;
    function: Function;
    any: any;
    Date: Date;
    RegExp: RegExp;
    Promise: Promise<any>;
    Array: Array<any>;
    Map: Map<any, any>;
    Set: Set<any>;
};
/**
 * Object with getPrimitiveTypes<Source, AllowFunctions extends boolean>(
 *  source: Source,
 *  allowFunctions: AllowFunctions = false
 * ): Object with properties from source that matches primitive type
 */
export declare type Properties = {
    [Key in keyof PrimitiveMap as `get${Capitalize<Key>}s`]: <Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions) => If<AllowFunctions, PropertiesWith<PrimitiveMap[Key] | ((...args: any[]) => PrimitiveMap[Key]), Source>, PropertiesWith<PrimitiveMap[Key], Source>>;
};
export declare const properties: Properties;
export {};

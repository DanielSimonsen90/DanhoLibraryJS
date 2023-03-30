import { PropertiesWith, If } from '../../Types';
import { StringExtensions } from '../String';

type PrimitiveMap = {
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
}

/**
 * Object with getPrimitiveTypes<Source, AllowFunctions extends boolean>(
 *  source: Source,
 *  allowFunctions: AllowFunctions = false
 * ): Object with properties from source that matches primitive type
 */
export type Properties = {
    [Key in keyof PrimitiveMap as `get${Capitalize<Key>}s`]: 
        <Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions?: AllowFunctions) => 
            If<AllowFunctions,
                PropertiesWith<PrimitiveMap[Key] | ((...args: any[]) => PrimitiveMap[Key]), Source>,
                PropertiesWith<PrimitiveMap[Key], Source>
            >
}

export const properties: Properties = [
    'string', 'number', 'boolean', 'undefined', 'null', 
    'object', 'function', 'any', 
    'Date', 'RegExp', 'Promise', 'Array', 'Map', 'Set'
].reduce((result, primitive) => {
    result[`get${StringExtensions.toPascalCase.bind(primitive)()}s` as keyof Properties] = function<Source extends {}, AllowFunctions extends boolean = false>(source: Source, withFunctions: AllowFunctions = false as AllowFunctions) {
        return Object.keysOf<Source>(source).reduce((result, key) => {
            if ((source[key] as any).constructor.name === primitive || 
                (withFunctions && typeof source[key] === 'function' && source[key] as any).constructor.name === primitive) {
                result[key] = source[key];
            }
            return result;
        }, {} as any);
    }
    return result;
}, {} as Properties);

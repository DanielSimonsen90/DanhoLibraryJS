/**
 * Filters all properties from From that has the return type of Type
 */
export declare type PropertiesWith<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? Key : never]: From[Key];
};
export default PropertiesWith;
/**
 * Fitlers all properties from From that don't have the return type of Type
 */
export declare type PropertiesWithout<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? never : Key]: From[Key];
};
export declare type TransformType<From, Start, Switch> = {
    [Key in keyof From]: From[Key] extends Start ? Switch : From[Key];
};
export declare type TransformTypes<From, BaseType, NewType> = Record<keyof {
    [Key in keyof From as From[Key] extends BaseType ? Key : never]: Key;
}, NewType>;
export declare type ValueOf<T> = T[keyof T];
export declare type AllPropsAre<Type> = {
    [key: string]: Type;
};

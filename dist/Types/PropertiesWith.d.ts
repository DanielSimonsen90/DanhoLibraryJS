/**
 * Filters all properties from From that has the return type of Type
 */
export declare type PropertiesWith<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? Key : never]: From[Key];
};
/**
 * Fitlers all properties from From that don't have the return type of Type
 */
export declare type PropertiesWithout<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? never : Key]: From[Key];
};
export default PropertiesWith;

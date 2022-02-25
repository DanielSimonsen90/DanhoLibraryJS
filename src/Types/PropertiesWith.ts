/**
 * Filters all properties from From that has the return type of Type
 */
export type PropertiesWith<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? Key : never]: From[Key]
}
export default PropertiesWith;

/**
 * Fitlers all properties from From that don't have the return type of Type
 */
export type PropertiesWithout<Type, From> = {
    [Key in keyof From as From[Key] extends Type ? never : Key]: From[Key]
}
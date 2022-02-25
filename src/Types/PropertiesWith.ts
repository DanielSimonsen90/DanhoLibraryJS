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

export type TransformType<From, Start, Switch> = {
    [Key in keyof From]: From[Key] extends Start ? Switch : From[Key]
}
//Returns object with properties matching BaseType with types of NewType
export type TransformTypes<From, BaseType, NewType> = Record<keyof { 
    [Key in keyof From as From[Key] extends BaseType ? Key : never]: Key 
}, NewType>
//Returns From with properties switched from BaseType to NewType
// export type TransformTypes<From, BaseType, NewType> = TransformType<From, BaseType[keyof BaseType], NewType>;

export type ValueOf<T> = T[keyof T];

export type AllPropsAre<Type> = {
    [key: string]: Type
}
/**
 * Converts Start types to Switch types in From type
 */
export type TransformType<From, Start, Switch> = {
    [Key in keyof From]: From[Key] extends Start ? Switch : From[Key];
};
/**
 * Returns object with properties matching BaseType with types of NewType
 */
export type TransformTypes<From, BaseType, NewType> = Record<keyof {
    [Key in keyof From as From[Key] extends BaseType ? Key : never]: Key;
}, NewType>;
export type Json<T> = {
    [Key in keyof T]: T[Key] extends object ? Json<T[Key]> : T[Key] extends Array<infer U> ? Array<Json<U>> : T[Key] extends number | string | boolean | null ? T[Key] : string;
};
export default TransformTypes;

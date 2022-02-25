/**
 * Converts Start types to Switch types in From type
 */
export declare type TransformType<From, Start, Switch> = {
    [Key in keyof From]: From[Key] extends Start ? Switch : From[Key];
};
/**
 * Returns object with properties matching BaseType with types of NewType
 */
export declare type TransformTypes<From, BaseType, NewType> = Record<keyof {
    [Key in keyof From as From[Key] extends BaseType ? Key : never]: Key;
}, NewType>;
export default TransformTypes;

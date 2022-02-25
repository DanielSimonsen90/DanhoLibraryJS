/**
 * Construct a type with the properties of Type except for those in type Properties.
 */
export declare type BetterOmit<Type, Properties extends keyof Type> = Omit<Type, Properties>;
/**
 * Extract from From those types that are assignable to Properties
 */
export declare type BetterExtract<From, Properties extends From> = Extract<From, Properties>;
export declare type PartialExcept<From, Properties extends keyof From> = Partial<From> & Required<Pick<From, Properties>>;

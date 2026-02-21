/**
 * Filters all properties from From that has the return type of Type
 */
export type PropertiesWith<Type, From> = {
  [Key in keyof From as From[Key] extends Type ? Key : never]: From[Key]
};
export default PropertiesWith;

/**
 * Fitlers all properties from From that don't have the return type of Type
 */
export type PropertiesWithout<Type, From> = {
  [Key in keyof From as From[Key] extends Type ? never : Key]: From[Key]
};

/**
 * GetRepeatedKeys<[
 *  { username: string, password: string },
 *  { username: number, email: string },
 * ]> // { username: string | number }
 */
export type GetRepeatedKeys<Types extends Array<any>> = (
  Types extends [infer First, infer Second, ...infer Rest]
    ? First extends object
      ? Second extends object
        ? {
          [Key in Extract<keyof First, keyof Second>]: First[Key] | Second[Key]
        } & GetRepeatedKeys<Rest>
        : {}
      : {}
    : {}
);
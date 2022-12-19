export type GetNestedProperty<Parent, Key extends string> = Key extends keyof Parent ? Parent[Key] : Key extends `${infer K}.${infer Rest}` ? K extends keyof Parent ? GetNestedProperty<Parent[K], Rest> : never : never;
/**
 * Gets a nested property from an object
 * @param parent Parent object to search
 * @param key Key to search for. Can be nested with dot notation
 * @returns Value of key or null if not found
 */
export declare function GetNestedProperty<Parent extends object, Key extends string>(parent: Parent, key: Key): GetNestedProperty<Parent, Key> | null;
export default GetNestedProperty;

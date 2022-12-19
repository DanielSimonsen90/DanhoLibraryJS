export type GetNestedProperty<Parent, Key extends string> =
    Key extends keyof Parent 
        ? Parent[Key] 
        : Key extends `${infer K}.${infer Rest}`
            ? K extends keyof Parent
                ? GetNestedProperty<Parent[K], Rest>
                : never
            : never;

/**
 * Gets a nested property from an object
 * @param parent Parent object to search
 * @param key Key to search for. Can be nested with dot notation
 * @returns Value of key or null if not found
 */
export function GetNestedProperty<Parent extends object, Key extends string>(parent: Parent, key: Key): GetNestedProperty<Parent, Key> | null {
    if (key in parent) return parent[key as any as keyof Parent] as any;

    for (const prop in parent) {
        if (typeof parent[prop] === 'object') {
            const result = GetNestedProperty((parent as any)[prop], key);
            if (result) return result as any;
        }
    }

    return null;
}

export default GetNestedProperty;
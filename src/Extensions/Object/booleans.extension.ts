declare global {
  interface ObjectConstructor {
    /**
     * Returns true if objects are equal by comparing their properties and values recursively. Does not compare functions.
     * @param a First object
     * @param b Second object
     * @returns true if objects are equal, false otherwise
     */
    areEqual<T extends object | null>(a?: T, b?: T): boolean;

    /**
     * Returns true if object is empty
     * @param obj Object to check
     */
    isNullOrUndefined(obj: any): obj is null | undefined;
  }
}

export function areEqual<T extends object | null>(a?: T, b?: T): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (isNullOrUndefined(a) && isNullOrUndefined(b)) return true;

  const keysA = Object.keys(a ?? {});
  const keysB = Object.keys(b ?? {});
  if (keysA.length !== keysB.length) return false;

  try {
    const jsonA = JSON.stringify(a);
    const jsonB = JSON.stringify(b);
    if (jsonA === jsonB) return true;
  } catch {
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!areEqual((a as any)[key], (b as any)[key])) return false;
    }
  }

  return true;
}
Object.areEqual = areEqual;

export function isNullOrUndefined(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}
Object.isNullOrUndefined = isNullOrUndefined;
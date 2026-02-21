declare global {
  interface ObjectConstructor {
    /**
     * Get a copy of object without specified properties or partial versions.
     * @param from Object to extract properties from
     * @param props Properties to extract/Omit
     */
    omit<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Omit<From, Props>;

    /**
     * Get a copy of object with only specified properties or partial versions.
     * @param from Object to extract properties from
     * @param props Properties to extract/Pick
     */
    pick<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Pick<From, Props>;

    /**
     * Receive an object with properties that are not in union of source and target objects
     * @param source Source object 
     * @param target Target object 
     * @param exclude Properties to exclude from difference
     * @returns Object with properties that are not in union of source and target objects, excluding specified properties
     */
    difference<T extends object>(source: T, target: T, ...exclude: Array<keyof T>): Omit<T, keyof T>;

    /**
     * Deeply combines objects, with later objects in parameters taking precedence over earlier ones. Does not combine arrays.
     * @param objects Objects to combine
     * @returns Combined object
     */
    combine<T extends Record<string, any | undefined>>(...objects: Array<Partial<T> | undefined>): T;
  }
}


export function omit<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Omit<From, Props> {
  return props.reduce((result, prop) => {
    if (typeof prop === "object") {
      const keys = Object.keysOf(prop);
      keys.forEach(key => delete (result as Partial<From>)[key]);
    } else {
      delete (result as Partial<From>)[prop];
    }

    return result;
  }, { ...from } as Omit<From, Props>);
}
Object.omit = omit;

export function pick<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Pick<From, Props> {
  return props.reduce((result, prop) => {
    if (typeof prop === "object") {
      const keys = Object.keysOf(prop);
      keys.forEach(key => (result as Partial<From>)[key] = from[key]);
    } else {
      (result as Partial<From>)[prop] = from[prop];
    }
    return result;
  }, {} as Pick<From, Props>);
}
Object.pick = pick;

export function difference<T extends object>(source: T, target: T, ...exclude: Array<keyof T>): Omit<T, keyof T> {
  const diffKeys = new Set([...Object.keysOf(source), ...Object.keysOf(target)]);
  exclude?.forEach(key => diffKeys.delete(key));

  return [...diffKeys.values()].reduce((acc, key, i, arr) => {
    const sourceValue = JSON.stringify(source[key]);
    const targetValue = JSON.stringify(target[key]);
    if (sourceValue !== targetValue) acc[key] = target[key];
    return acc;
  }, {} as T);
}
Object.difference = difference;

type Combinable<T extends Record<string, any>> = {
  [key in keyof T]?: T[key] extends Record<string, any> ? Combinable<T[key]> : T[key];
};

export function combine<T extends Record<string, any | undefined>>(...objects: Array<Combinable<T> | undefined>): T {
  return objects.reduce((acc: T, obj) => {
    if (!obj) return acc;

    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        try {
          acc[key] = combine(acc[key] as T, obj[key] as T) as any;
        } catch (err) {
          const error = err as Error;
          if (error.message.includes('Maximum call stack size exceeded')) {
            acc[key] = obj[key] as any;
          } else throw err;
        }
      } else if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
        // @ts-ignore
        (acc[key] as Combinable<T>) = obj[key];
      }
    }
    return acc;
  }, {} as T) as T;
}
Object.combine = combine;
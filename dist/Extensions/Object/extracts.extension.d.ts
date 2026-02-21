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
export declare function omit<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Omit<From, Props>;
export declare function pick<From extends {}, Props extends keyof From>(from: From, ...props: Array<Props | Partial<From>>): Pick<From, Props>;
export declare function difference<T extends object>(source: T, target: T, ...exclude: Array<keyof T>): Omit<T, keyof T>;
type Combinable<T extends Record<string, any>> = {
    [key in keyof T]?: T[key] extends Record<string, any> ? Combinable<T[key]> : T[key];
};
export declare function combine<T extends Record<string, any | undefined>>(...objects: Array<Combinable<T> | undefined>): T;
export {};

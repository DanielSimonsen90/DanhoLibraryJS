export * from './Array';
export * from './Document';
export * from './Map';
export * from './Object';
export * from './String';
declare global {
    interface BooleanConstructor {
        /**
         * Parses string to boolean. Will only return true if value === "true" otherwise false
         */
        parseBoolean(value: string): boolean;
    }
}
declare function parseBoolean(value: string): boolean;
export declare const BooleanExtensions: {
    parseBoolean: typeof parseBoolean;
};

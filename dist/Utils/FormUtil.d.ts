/**
 * Serialize a form into an object
 * @param form The form to serialize
 * @returns An object of type T from the form
 */
export declare function serializeForm<T extends object>(form: HTMLFormElement, log?: boolean): T;

declare type CSSReturnTypes = {
    string: string;
    number: number;
};
/**
 * Gets the value of "property" in type "type" from query "query"
 * Basically, you can get your --color-primary from :root
 *
 * @param property Name of the property to get
 * @param type Type of the property to parse
 * @param query Query to get the element that has the property
 * @returns Property value converted to type
*/
export declare function GetCSSProperty<Type extends keyof CSSReturnTypes>(property: string, type: Type, query?: string): CSSReturnTypes[Type];
export {};

type CSSReturnTypes = {
    string: string,
    number: number
}

/**
 * Gets the value of "property" in type "type" from query "query"
 * Basically, you can get your --color-primary from :root
 * 
 * @param property Name of the property to get
 * @param type Type of the property to parse
 * @param query Query to get the element that has the property
 * @returns Property value converted to type
*/
export function GetCSSProperty<Type extends keyof CSSReturnTypes>(property: string, type: Type, query = ":root"): CSSReturnTypes[Type] {
    const rootEl = document.querySelector(query);
    if (!rootEl) throw new Error(`${query} does not exist!`);

    const rootStyles = getComputedStyle(rootEl);
    const cssProp = rootStyles.getPropertyValue(property);
    if (type === 'string') return cssProp as CSSReturnTypes[Type];

    const numberValue = parseInt(cssProp);
    if (isNaN(numberValue)) throw new Error(`${property} is not a number!: ${cssProp}`);
    return numberValue as CSSReturnTypes[Type];
}


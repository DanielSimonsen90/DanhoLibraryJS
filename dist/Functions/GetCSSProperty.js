"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCSSProperty = void 0;
/**
 * Gets the value of "property" in type "type" from query "query"
 * Basically, you can get your --color-primary from :root
 *
 * @param property Name of the property to get
 * @param type Type of the property to parse
 * @param query Query to get the element that has the property
 * @returns Property value converted to type
*/
function GetCSSProperty(property, type, query = ":root") {
    const rootEl = document.querySelector(query);
    if (!rootEl)
        throw new Error(`${query} does not exist!`);
    const rootStyles = getComputedStyle(rootEl);
    const cssProp = rootStyles.getPropertyValue(property);
    if (type === 'string')
        return cssProp;
    const numberValue = parseInt(cssProp);
    if (isNaN(numberValue))
        throw new Error(`${property} is not a number!: ${cssProp}`);
    return numberValue;
}
exports.GetCSSProperty = GetCSSProperty;

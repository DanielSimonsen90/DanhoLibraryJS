# [DanhoLibraryJS](../README.md)

## Functions

```ts
/**
 * Copies value to clipboard and alerts a response, if response is defined
 * @param value Value to clipboard
 * @param response Alerts if response is given
 */
async function CopyToClipboard(value: string, response?: string): Promise<void>;

/**
 * Gets the value of "property" in type "type" from query "query"
 * Basically, you can get your --color-primary from :root
 * 
 * @param property Name of the property to get
 * @param type Type of the property to parse
 * @param query Query to get the element that has the property
 * @returns Property value converted to type
*/
function GetCSSProperty<Type extends keyof CSSReturnTypes>(property: string, type: Type, query = ":root"): CSSReturnTypes[Type];

/**
 * Create HTMLEvent object from function
 * @param name Name of the event
 * @param handler Handler for the event
 * @returns Parameters as object
 */
function HTMLEvent<
    Event extends keyof HTMLElementEventMap, 
    ReturnType extends any
>(name: Event, handler: (event: HTMLElementEventMap[Event]) => ReturnType): { 
    name: Event, 
    handler: (event: HTMLElementEventMap[Event]) => ReturnType 
}

/**
 * Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param query The query selector for Document.querySelector
 * @param currentPageClasses Class(es) to append header's "a" elements
 * 
 * @borrows Document.querySelector
 */
function SetNavigationSelected(query: string, ...currentPageClasses: Array<string>): void;

/**
 * Converts input into milliseconds
 * @param input Input to convert to ms. 1s | 2m | 3h | 1M | 60000
 * @returns Millisecond value of input
 */
function ms(input: TimeDelay): number
```

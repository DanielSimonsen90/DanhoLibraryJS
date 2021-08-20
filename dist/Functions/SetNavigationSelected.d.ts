/**
 * Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param query The query selector for Document.querySelector
 * @param currentPageClasses Class(es) to append header's "a" elements
 *
 * @borrows Document.querySelector
 */
export declare function SetNavigationSelected(query: string, ...currentPageClasses: string[]): void;
export default SetNavigationSelected;

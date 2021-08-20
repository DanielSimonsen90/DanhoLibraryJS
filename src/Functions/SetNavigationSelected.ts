/**
 * Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param query The query selector for Document.querySelector
 * @param currentPageClasses Class(es) to append header's "a" elements
 * 
 * @borrows Document.querySelector
 */
 export function SetNavigationSelected(query: string, ...currentPageClasses: string[]) {
    const header = document.querySelector(query);
    const children = header.children.array().filter(c => c.tagName === 'a') as HTMLAnchorElement[];
    const currentPage = document.location.href;

    children.forEach(gc => {
        if (gc.href != currentPage) gc.classList.remove(...currentPageClasses);
        else gc.classList.add(...currentPageClasses);
    })
}
export default SetNavigationSelected;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetNavigationSelected = void 0;
/**
 * Appends classes to header's "a" elements, when navigation to "a"'s page is selected
 * @param query The query selector for Document.querySelector
 * @param currentPageClasses Class(es) to append header's "a" elements
 *
 * @borrows Document.querySelector
 */
function SetNavigationSelected(query, ...currentPageClasses) {
    const header = document.querySelector(query);
    const children = header.children.array().filter(c => c.tagName === 'a');
    const currentPage = document.location.href;
    children.forEach(gc => {
        if (gc.href != currentPage)
            gc.classList.remove(...currentPageClasses);
        else
            gc.classList.add(...currentPageClasses);
    });
}
exports.SetNavigationSelected = SetNavigationSelected;
exports.default = SetNavigationSelected;

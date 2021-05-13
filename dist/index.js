//#endregion
//#region Global Functions
function CopyToClipboard(input, value, response) {
    //Give the website body the new input variable
    document.body.appendChild(input);
    //Input's value is the item/string we're copying
    input.value = value;
    //Select the value (sort of like crtl + a)
    input.select();
    //Run the copy command
    document.execCommand("copy");
    //yeet the input element
    input.remove();
    if (response)
        alert(response);
}
function SetNavigationSelected(currentPageClass) {
    let header = document.querySelector('header');
    let children = header.children.array().filter(c => c.tagName === 'a');
    let currentPage = document.location.href;
    children.forEach(gc => {
        if (gc.href != currentPage)
            gc.classList.remove(currentPageClass);
        else
            gc.classList.add(currentPageClass);
    });
}
//#endregion
//#region Extensions
Document.prototype.createProperElement = function (tagName, options) {
    let baseElement = document.createElement(tagName);
    if (!options)
        return baseElement;
    if (options.classes) {
        baseElement.classList.add(...options.classes);
    }
    if (options.attributes) {
        options.attributes.forEach(([attribute, value]) => baseElement.setAttribute(attribute, value));
    }
    if (options.children) {
        baseElement.append(...options.children);
    }
    return baseElement;
};
HTMLCollection.prototype.array = function () {
    let result = new Array();
    for (let i = 0; i < this.length; i++) {
        result.push(this.item(i));
    }
    return result;
};
//#endregion

interface ElementOptions<K extends keyof HTMLElementTagNameMap> {
    classes?: string[];
    attributes?: [string, string][];
    children?: HTMLElementTagNameMap[K][];
}
declare function CopyToClipboard(input: HTMLTextAreaElement, value: string, response?: string): void;
declare function SetNavigationSelected(currentPageClass: string): void;

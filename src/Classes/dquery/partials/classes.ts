import BaseDQuery, { DefaultElement } from "../dquery";

class Toggle {
    constructor(public start: string, public end: string) {}
    public toggled: boolean = false;

    public get value() {
        return this.toggled ? this.end : this.start;
    }

    public toggle(force: boolean = false): boolean {
        return this.toggled = force ? force : !this.toggled;
    }
}

class DQueryClasses extends DOMTokenList {
    private _toggles: Map<string, Toggle> = new Map();

    public override (token: string, force: boolean = false): boolean {
        const toggle = this._toggles.get(token);
        return toggle?.toggle(force) ?? super.toggle(token, force);
    }
}

export default function Classes<
    HtmlElement extends DefaultElement, 
    DQuery extends BaseDQuery<HtmlElement>
>(dquery: DQuery) {
    return Object.assign(dquery, {
        classes: new DQueryClasses()
    });
}
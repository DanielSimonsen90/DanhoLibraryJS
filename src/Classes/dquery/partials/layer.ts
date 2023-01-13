import { Arrayable } from '../../../Types';
import BaseDQuery, { DefaultElement } from '../dquery';
import $, { Combined } from '../index';

// Modal
// Tooltip
// Toast
// Alert
// Collapse / Dropdown

// Carousel?

type Vertical = 'left' | 'middle' | 'right';
type Horizontal = 'top' | 'center' | 'bottom';
type Position = Vertical | Horizontal | `${Horizontal}-${Vertical}`; 

type AcceptableElement = Arrayable<HTMLElement | string | BaseDQuery<DefaultElement> | NodeListOf<DefaultElement>>;

type ContextMenuOptions<HtmlElement extends DefaultElement> = {
    // position: Position;
    element: AcceptableElement;
    onOpen: (event: MouseEvent, self: Combined<HtmlElement, any>) => void;
    onClose: (self: Combined<HtmlElement, any>) => void;
    onItemSelect: (item: string, event: MouseEvent, self: Combined<HtmlElement, any>) => void;
}

export default function Layer<
    HtmlElement extends DefaultElement,
    DQuery extends BaseDQuery<HtmlElement>
>(dquery: DQuery) {
    const self = dquery as any as Combined<HtmlElement, any>;
    const createMenu = ({ element }: ContextMenuOptions<HtmlElement>) => {
        const areMenuOptions = (
            Array.isArray(element)
            && element.every(element => typeof element === 'string')
            && !(element[0] as string).startsWith('<')
        );

        const result: any = areMenuOptions ? $.create(`
            <ul class="context-menu">
                ${element.map(option => `<li>${option}</li>`).join('\n')}
            </ul>
        `)
        : element instanceof Array && element.every(element =>
            typeof element === 'string'
            || element instanceof Element
        ) ? $.create(`
            <div class="context-menu">
                ${element.map((child, index) => (
                    `<li data-menu-item="${index}">${child instanceof Element ? child.innerHTML : child}</li>`
                )).join('\n')}
            </div>
        `)
        : element instanceof Element ? $(element)
        : element instanceof BaseDQuery ? $(element)    
        : element instanceof NodeList ? $.create(`
            <ul class="context-menu">
                ${Array.from(element).map((child, index) => (
                    `<li data-menu-item="${child.dataset.menuItem ?? index}">${child.innerHTML}</li>`
                )).join('\n')}
            </ul>`
        ) : $.create(`
            <ul class="context-menu">
                ${(() => {
                    console.error(`[DanhoLibrary] [DQuery]: Invalid element type "${typeof element}" for context menu.`, element);
                    return `
                        <div class="error">
                            <h1>Invalid element type "${typeof element}" for context menu.</h1>
                            <p>Expected: Arrayable<HTMLElement | string | BaseDQuery<DefaultElement> | NodeListOf<DefaultElement>></p>
                        </div>
                    `
                })()}   
            </ul>
        `);

        return result as Combined<HtmlElement, any>;
    }
    let isOpen = false;

    class DQueryLayer {
        public createLayer(id: string) {
            const layer: any = $('body', { updateMode: 'auto' })
                .children()
                .prepend(`<div id="${id}" class="layer"></div>`);
            return layer as Combined<HtmlElement, any>;
        }
        public removeLayer(id: string) {
            $(`#${id}`).remove();
        }

        /**
         * Set a context menu (right click options) for the element.
         * @param options Options for the context menu.
         * @returns The context menu.
         */
        public contextMenu(options: ContextMenuOptions<HtmlElement>) {
            const { onOpen, onClose, onItemSelect } = options;
            const menu = createMenu(options);
            const layerId = 'context-menu-layer';
            const layer = this.createLayer(layerId);

            self.on('contextmenu', event => {
                event.preventDefault();
                event.stopPropagation();

                const { clientX, clientY } = event;
                const { width, height } = menu;

                menu.style({
                    top: `${clientY - height}px`,
                    left: `${clientX - width}px`,
                });

                isOpen = true;
                onOpen(event, self);
                layer.children().append(menu.htmlElement);
            });

            $('body').on('click', () => {
                if (!isOpen) return;

                isOpen = false;
                onClose(self);
                layer.children().remove(menu as any);
                this.removeLayer(layerId);
            });

            menu.on('click', event => {
                if (!isOpen) return;

                const target = $(event.target);
                if (!target.attr('data-menu-item')) return;
                if (target.html === menu.html) return event.stopPropagation();

                onItemSelect(target.text, event, self);
            });

            return menu;
        }


    }

    return Object.assign(dquery, new DQueryLayer());
}
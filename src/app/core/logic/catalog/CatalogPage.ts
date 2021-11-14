export class CatalogPage {
    private _id: number;
    private _icon: number;
    private _linkName: string;
    private _caption: string;
    private _enabled: boolean;

    private _catalogPages: CatalogPage[];
    private _items: number[];

    constructor(id: number, icon: number, linkName: string, caption: string) {
        this._catalogPages = [];
        this._items = [];

        this._id = id;
        this._icon = icon;
        this._linkName = linkName;
        this._caption = caption;
    }

    addPage(catalogPage: CatalogPage) {
        this._catalogPages.push(catalogPage);
    }

    addItem(itemId: number) {
        this._items.push(itemId);
    }

    public get id(): number {
        return this._id;
    }

    public get catalogPages(): CatalogPage[] {
        return this._catalogPages;
    }

    public get items(): number[] {
        return this._items;
    }

    public get icon(): number {
        return this._icon;
    }

    public get linkName(): string {
        return this._linkName;
    }

    public get caption(): string {
        return this._caption;
    }

    public get enabled(): boolean {
        return this._enabled;
    }
}

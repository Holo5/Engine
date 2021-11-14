import { CatalogItem } from './items/CatalogItem';

export class CatalogPageItems {
    private _id: number;
    private type: string;
    private template: string;
    private images: string[];
    private texts: string[];
    private _catalogItems: CatalogItem[];

    constructor(id: number, type: string, template: string, images: string[], texts: string[]) {
        this._id = id;
        this.type = type;
        this.template = template;
        this.images = images;
        this.texts = texts;
        this._catalogItems = [];
    }

    addCatalogItem(catalogItem: CatalogItem) {
        this._catalogItems.push(catalogItem);
    }

    public get id(): number {
        return this._id;
    }

    public get catalogItems(): CatalogItem[] {
        return this._catalogItems;
    }
}

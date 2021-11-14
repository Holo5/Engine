import { Container, DisplayObject, Rectangle } from 'pixi.js';
import { Color } from '../../../../../common/utils/Color';
import { Engine } from '../Engine';
import { IGraphicObject } from '../../objects/object/interfaces/IGraphicObject';
import { EventCategory } from '../../objects/object/enums/EventCategory';

type EventCategoryIndexed = {
    [guid: string]: IGraphicObject
};

export class SortableContainer extends Container {
    public engine: Engine;

    public floorCategory: EventCategoryIndexed;
    private _wallCategory: EventCategoryIndexed;
    public furniCategory: EventCategoryIndexed;
    private _avatarCategory: EventCategoryIndexed;

    constructor(engine: Engine) {
        super();

        this.engine = engine;
        this.interactiveChildren = false;
        this.sortableChildren = true;

        this.floorCategory = {};
        this._wallCategory = {};
        this.furniCategory = {};
        this._avatarCategory = {};
    }

    center() {
        const rect = this.parent.hitArea as Rectangle;
        this.position.set(
            ((rect.width - this.width) / 2) | 0,
            ((rect.height - this.height) / 2) - 60 | 0,
        );
    }

    changeColor(hue: number, saturation: number, lightness: number) {
        this.engine.app.renderer.backgroundColor = Color.hsl2hex(hue, saturation, lightness);
    }

    clear(displayHotelView: boolean = false) {
        this.removeChildren();

        this.floorCategory = {};
        this._wallCategory = {};
        this.furniCategory = {};
        this._avatarCategory = {};

        this.changeColor(0, 0, 0);
        this.engine.eventManager.enableEvents();

        if (displayHotelView) {
            this.displayHotelView();
        }
    }

    displayHotelView() {
        this.engine.eventManager.disableEvents();
        this.addChild(this.engine.hotelView);
    }

    public addGraphicObject(go: IGraphicObject) {
        this.addChild(go.graphic);

        if (go.eventCategory === EventCategory.FLOOR) {
            this.floorCategory[go.guid] = go;
        } else if (go.eventCategory === EventCategory.WALL) {
            this._wallCategory[go.guid] = go;
        } else if (go.eventCategory === EventCategory.FURNI) {
            this.furniCategory[go.guid] = go;
        } else if (go.eventCategory === EventCategory.AVATARS) {
            this._avatarCategory[go.guid] = go;
        }
    }

    public removeGraphicObject(go: IGraphicObject, disposing: boolean = true) {
        if (disposing) {
            go.dispose();
        }

        if (go.eventCategory === EventCategory.FLOOR) {
            delete this.floorCategory[go.guid];
        } else if (go.eventCategory === EventCategory.WALL) {
            delete this._wallCategory[go.guid];
        } else if (go.eventCategory === EventCategory.FURNI) {
            delete this.furniCategory[go.guid];
        } else if (go.eventCategory === EventCategory.AVATARS) {
            delete this._avatarCategory[go.guid];
        }

        this.removeChild(go.graphic);
    }

    public sortChildren() {
        // @ts-ignore
        this.children = this.children.sort(this.sortChildrenAlgo);

        this.sortDirty = false;
    }

    sortChildrenAlgo(a: DisplayObject, b: DisplayObject): number {
        // TODO refactor this
        if (Number.isNaN(a.zIndex)) {
            a.zIndex = -10000000000;
        }

        if (Number.isNaN(b.zIndex)) {
            b.zIndex = -10000000000;
        }

        if (a.zIndex < b.zIndex) return 1;
        if (a.zIndex > b.zIndex) return -1;

        return 0;
    }
}

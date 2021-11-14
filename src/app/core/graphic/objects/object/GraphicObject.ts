import { IPointData, Sprite, Texture } from 'pixi.js';
import { IVector3D } from '@holo5/roombuilder';
import { IGraphicObject } from './interfaces/IGraphicObject';
import { IAnimation } from './interfaces/IAnimation';
import { ITween } from './interfaces/ITween';
import { GraphicData } from './cache/GraphicData';
import { GraphicGuid } from '../../engine/utils/GraphicGuid';
import { Tween } from './Tween';
import { Animation } from './Animation';
import { SortableContainer } from '../../engine/container/SortableContainer';
import { EventCategory } from './enums/EventCategory';

export abstract class GraphicObject implements IGraphicObject {
    mapPosition: IVector3D;
    screenPosition: IVector3D;
    tween: ITween;
    animation: IAnimation;
    graphic: Sprite;
    guid: string;
    eventCategory: EventCategory;
    disposed: boolean;
    fixedAlpha: number = 1;

    protected constructor() {
        this.graphic = new Sprite(Texture.EMPTY);
        this.guid = GraphicGuid.create();
        this.eventCategory = EventCategory.NONE;
        this.disposed = false;

        this.animation = new Animation(this);
        this.tween = new Tween(this);
    }

    updateFromVectors(mapPosition: IVector3D, screenPosition: IVector3D) {
        this.mapPosition = mapPosition;
        this.screenPosition = screenPosition;

        this.graphic.x = screenPosition.x + this.getOffsetX();
        this.graphic.y = screenPosition.y + this.getOffsetY();

        this.graphic.zIndex = this.getZIndex();
    }

    public addInContainerAndDisplay(container: SortableContainer): void {
        this.animation.preDisplay();
        container.addGraphicObject(this);
        this.animation.display();
    }

    setRenderableData(renderableData: GraphicData) {
        this.graphic.texture = renderableData.texture;

        this.graphic.containsPoint = (position: IPointData) => renderableData.hitArea.contains(Math.floor(position.x - this.graphic.x),
            Math.floor(position.y - this.graphic.y));
    }

    resetTexture() {
        this.graphic.texture = Texture.EMPTY;
    }

    setTexture(texture: Texture) {
        this.graphic.texture = texture;
    }

    dispose() {
        this.disposed = true;
        this.graphic.destroy();
    }

    getOffsetX(): number {
        return 0;
    }

    getOffsetY(): number {
        return 0;
    }

    public getName(): string {
        return this.graphic.name;
    }

    abstract getZIndex(): number;
}

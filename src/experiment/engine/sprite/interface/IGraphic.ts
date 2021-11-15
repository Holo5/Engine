import { AssetsManager } from '../../assets/AssetsManager';
import { EventCategory } from '../enum/EventCategory';
import { ICurrentEvents } from '../../events/interface/ICurrentEvents';
import { IVector3D } from '@holo5/roombuilder';
import { Point, Rectangle, Sprite } from 'pixi.js';

export interface IGraphic extends Sprite {
    bounds: Rectangle;
    currentPosition: IVector3D;

    needInit(): boolean;

    needFrameUpdate(): boolean;

    needPositionUpdate(): boolean;

    needUpdate(): boolean;

    updateInit(resourceManager: AssetsManager): void;

    updateFrame(): void;

    updatePosition(point: Point): void;

    updateBounds(): void;

    update(now: number): void;

    checkBounds(bounds: Rectangle): void;

    checkEvents(currentEvents: ICurrentEvents): boolean;

    setPosition(position: IVector3D): void;

    getEventCategory(): EventCategory;

    dispose(): void;
}

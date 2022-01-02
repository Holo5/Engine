import { AssetsManager } from '../../assets/AssetsManager';
import { EventCategory } from '../enum/EventCategory';
import { ICurrentEvents } from '../../events/interface/ICurrentEvents';
import { IVector3D } from '@holo5/roombuilder';
import { Point, Rectangle, Sprite } from 'pixi.js';

export interface IGraphic extends Sprite {
    needInitialization(): boolean;
    initialize(resourceManager: AssetsManager): void;
    setInitialized(): void;
    requestInitialization(): void;

    needFrameUpdate(): boolean;
    updateFrame(): void;
    setFrameUpdated(): void;
    requestFrameUpdate(): void;

    needTweenUpdate(): boolean;
    updateTween(now: number): void;

    needPositionUpdate(): boolean;
    updatePosition(point: Point): void;
    setPositionUpdated(): void;
    requestPositionUpdate(): void;
    setPosition(position: IVector3D): void;
    getCurrentPosition(): IVector3D;

    getBounds(): Rectangle;
    updateBounds(): void;
    checkBounds(bounds: Rectangle): void;

    checkEvents(currentEvents: ICurrentEvents): boolean;
    getEventCategory(): EventCategory;

    dispose(): void;
}

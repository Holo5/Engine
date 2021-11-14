import { DisplayObject } from 'pixi.js';
import { IVector3D } from '@holo5/roombuilder';
import { IAnimation } from './IAnimation';
import { ITween } from './ITween';
import { SortableContainer } from '../../../engine/container/SortableContainer';
import { EventCategory } from '../enums/EventCategory';

export interface IGraphicObject {
    mapPosition: IVector3D;
    screenPosition: IVector3D;

    tween: ITween;
    animation: IAnimation;

    disposed: boolean;
    fixedAlpha: number;

    graphic: DisplayObject;
    guid: string;
    eventCategory: EventCategory;

    getName(): string;

    updateFromVectors(mapPosition: IVector3D, screenPosition: IVector3D): void;
    getOffsetX(): number;
    getOffsetY(): number;
    getZIndex(): number;

    addInContainerAndDisplay(container: SortableContainer): void;

    dispose(): void;
}

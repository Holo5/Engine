import { Point } from 'pixi.js';

export interface ICurrentEvents {
    clicking: boolean, doubleClicking: boolean, dragging: boolean, currentCursor: Point, cursorOffset: Point
}

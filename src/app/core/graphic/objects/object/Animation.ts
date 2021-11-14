import { IVector3D } from '@holo5/roombuilder';
import { IAnimation } from './interfaces/IAnimation';
import { IGraphicObject } from './interfaces/IGraphicObject';

export class Animation implements IAnimation {
    constructor(private _graphicObject: IGraphicObject) {}

    public preDisplay() {
        this._graphicObject.graphic.y -= 100;
        this._graphicObject.graphic.alpha = 0;
    }

    public display(callback?: () => void): void {
        this._graphicObject.tween.displayAnimation(callback);
    }

    public ghosted(): void {
        this._graphicObject.graphic.renderable = true;
        this._graphicObject.graphic.alpha = 0.3;
    }

    public hide(): void {
        this._graphicObject.graphic.renderable = false;
        this._graphicObject.graphic.alpha = 0;
    }

    public pickup(): void {

    }

    public place(): void {

    }

    public poof(): void {

    }

    moveTo(mapPosition: IVector3D, screenPosition: IVector3D) {
        this._graphicObject.tween.translateTo(mapPosition, screenPosition);
    }

    public rotateTo(direction: number): void {
        this._graphicObject.tween.startRotation(() => {
            // @ts-ignore
            this._graphicObject.updateDirection(direction);
            this._graphicObject.tween.endRotation();
        });
    }
}

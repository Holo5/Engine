import { TimelineLite, TweenMax } from 'gsap/gsap-core';
import { IVector3D } from '@holo5/roombuilder';
import { ITween } from './interfaces/ITween';
import { IGraphicObject } from './interfaces/IGraphicObject';

export class Tween implements ITween {
    constructor(private _graphicObject: IGraphicObject) {}

    public translateTo(mapPosition: IVector3D, screenPosition: IVector3D): void {
        if (this._graphicObject.disposed) {
            return;
        }

        const translateTest = new TimelineLite();
        translateTest
            .to(this._graphicObject.graphic, {
                duration: 0.5,
                pixi: {
                    x: screenPosition.x + this._graphicObject.getOffsetX(),
                    y: screenPosition.y + this._graphicObject.getOffsetY(),
                },
                ease: 'none',
            })
            .eventCallback('onComplete', () => {
                if (!this._graphicObject.disposed) {
                    this._graphicObject.updateFromVectors(mapPosition, screenPosition);
                }
            })
            .eventCallback('onStart', () => {
                setTimeout(() => {
                    if (!this._graphicObject.disposed) {
                        this._graphicObject.graphic.zIndex = screenPosition.z;
                    }
                }, screenPosition.z > this._graphicObject.screenPosition.z ? 100 : 400);
            })
            .play();
    }

    public startRotation(callback: () => void): void {
        if (this._graphicObject.disposed || this._graphicObject.graphic === undefined) {
            return;
        }

        const translate = TweenMax.to(this._graphicObject.graphic, 0.05, {
            pixi: {
                y: this._graphicObject.graphic.y - 10,
            },
            ease: 'none',
        });
        translate.eventCallback('onComplete', callback);
        translate.play();
    }

    public endRotation(): void {
        if (this._graphicObject.disposed || this._graphicObject.graphic === undefined) {
            return;
        }

        const translate = TweenMax.to(this._graphicObject.graphic, 0.05, {
            pixi: {
                y: this._graphicObject.graphic.y + 10,
            },
            ease: 'none',
        });
        translate.play();
    }

    public displayAnimation(callback?: () => void): void {
        if (this._graphicObject.disposed || this._graphicObject.graphic === undefined) {
            return;
        }

        const translate = TweenMax.to(this._graphicObject.graphic, 0.3, {
            pixi: {
                y: this._graphicObject.graphic.y + 100,
                alpha: this._graphicObject.fixedAlpha,
            },
            ease: 'ease-out',
        });
        translate.delay(Math.random() * 0.2);
        translate.eventCallback('onComplete', callback);
        translate.play();
    }
}

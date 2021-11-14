import { Rectangle } from 'pixi.js';

export class RenderableHitArea extends Rectangle {
    private _pixels: Uint8Array;

    constructor(x: number, y: number, width: number, height: number, pixels: Uint8Array) {
        super(x, y, width, height);
        this._pixels = pixels;
    }

    public contains(x: number, y: number): boolean {
        return super.contains(x, y) && this._pixels[((x + y * this.width) * 4) + 3] > 20;
    }
}

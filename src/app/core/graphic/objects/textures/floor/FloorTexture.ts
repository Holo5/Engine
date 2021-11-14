import * as PIXI from 'pixi.js';

export class FloorTexture {
    pixels: Uint8Array;
    texture: PIXI.RenderTexture;
    _cachedResult: Map<string, boolean>;

    constructor(pixels: Uint8Array, texture: PIXI.RenderTexture) {
        this.pixels = pixels;
        this.texture = texture;
        this._cachedResult = new Map<string, boolean>();
    }

    hitTestAlpha(point: PIXI.IPointData) {
        const cached = this._cachedResult.get(`${point.x.toString()};${point.y.toString()}`);
        if (cached !== undefined) return cached;

        const result: boolean = this.pixels[(point.x + point.y * this.texture.width) * 4] !== 0;
        this._cachedResult.set(`${point.x.toString()};${point.y.toString()}`, result);

        return result;
    }
}

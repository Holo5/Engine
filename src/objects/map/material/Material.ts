import * as PIXI from 'pixi.js';

export class Material {
    public color: number;
    public texture: PIXI.Texture;

    constructor(color: number, texture: PIXI.Texture) {
        this.color = color;
        this.texture = texture;
    }

    public toWhite() {
        return new Material(12303291, PIXI.Texture.WHITE);
    }
}

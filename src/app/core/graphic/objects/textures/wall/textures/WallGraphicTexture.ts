import * as PIXI from 'pixi.js';
import { DrawableTile } from '@holo5/roombuilder';
import { Material } from '../../../../managers/texture-manager/Material';

export abstract class WallGraphicTexture extends PIXI.Sprite {
    protected _wallMaterial: Material;
    protected _drawableTile: DrawableTile;
    protected _wallHeight: number;
    protected _wallThickness: number;
    protected _points: { x: number, y: number }[];

    constructor(
        wallMaterial: Material,
        drawableTile: DrawableTile,
        wallHeight: number,
        wallThickness: number,
    ) {
        super();

        this._wallMaterial = wallMaterial;
        this._drawableTile = drawableTile;
        this._wallHeight = wallHeight;
        this._wallThickness = wallThickness;
    }

    abstract drawParts(): void;
}

import { Container, Graphics, TilingSprite, utils } from 'pixi.js';
import { DrawableTile } from '@holo5/roombuilder';
import { Engine } from '../../../../../Engine';
import { Material } from '../../../material/Material';
import { WallGraphicTexture } from './WallGraphicTexture';

export class DoorWallTexture extends WallGraphicTexture {
    constructor(wallMaterial: Material, drawableTile: DrawableTile, wallHeight: number, wallThickness: number) {
        super(wallMaterial, drawableTile, wallHeight, wallThickness);

        this._points = [
            {
                x: 0,
                y: 0,
            },
            {
                x: 32,
                y: 0,
            },
            {
                x: 32,
                y: 40 + (this._drawableTile.wallHeight + wallHeight) * 32,
            },
            {
                x: 0,
                y: 40 + (this._drawableTile.wallHeight + wallHeight) * 32,
            },
        ];

        this.drawParts();
    }

    public drawParts(): void {
        const texturedPart = new TilingSprite(this._wallMaterial.texture, this._points[2].x, this._points[2].y);
        texturedPart.transform.setFromMatrix(Engine.RIGHT_ISO_MATRIX);
        texturedPart.tint = utils.premultiplyTint(this._wallMaterial.color, 0.85);
        this.addChild(texturedPart);

        const borderedParts = new Container();
        const top = new Graphics()
            .beginFill(0xFFFFFF)
            .moveTo(this._points[0].x - this._wallThickness * 2, this._points[0].y - this._wallThickness * 2)
            .lineTo(this._points[1].x - this._wallThickness * 2, this._points[1].y - this._wallThickness * 2)
            .lineTo(this._points[1].x, this._points[1].y)
            .lineTo(this._points[0].x, this._points[0].y);
        top.tint = utils.premultiplyTint(this._wallMaterial.color, 0.6);
        const left = new Graphics()
            .beginFill(0xFFFFFF)
            .moveTo(this._points[0].x - this._wallThickness * 2, this._points[0].y - this._wallThickness * 2)
            .lineTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[3].x, this._points[3].y)
            .lineTo(this._points[3].x - this._wallThickness * 2, this._points[3].y - this._wallThickness * 2);
        left.tint = utils.premultiplyTint(this._wallMaterial.color, 1);

        borderedParts.addChild(top);
        borderedParts.addChild(left);
        borderedParts.transform.setFromMatrix(Engine.RIGHT_ISO_MATRIX);

        this.addChild(borderedParts);
    }
}

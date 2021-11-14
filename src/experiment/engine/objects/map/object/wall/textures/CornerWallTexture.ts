import { Container, Graphics, TilingSprite, utils } from 'pixi.js';
import { DrawableTile } from '@holo5/roombuilder';
import { Engine } from '../../../../../Engine';
import { Material } from '../../../material/Material';
import { WallGraphicTexture } from './WallGraphicTexture';

export class CornerWallTexture extends WallGraphicTexture {
    constructor(wallMaterial: Material, drawableTile: DrawableTile, wallHeight: number, wallThickness: number) {
        super(wallMaterial, drawableTile, wallHeight, wallThickness);

        this.drawParts();
    }

    private drawRightBorder() {
        this._points = [
            { x: -this._wallThickness * 2 + 33, y: -32 },
            { x: 67, y: -32 },
            { x: 67, y: 123 + (this._drawableTile.wallHeight + this._wallHeight) * 32 },
            { x: 33, y: 123 + (this._drawableTile.wallHeight + this._wallHeight) * 32 },
        ];

        const rightBorders = new Container();

        const top = new Graphics()
            .beginFill(0xFFFFFF)
            .moveTo(this._points[0].x + 1, this._points[0].y)
            .lineTo(this._points[0].x + this._wallThickness * 2, this._points[0].y - this._wallThickness * 2)
            .lineTo(this._points[1].x + 1 + this._wallThickness * 2, this._points[1].y - this._wallThickness * 2)
            .lineTo(this._points[1].x, this._points[1].y);
        top.tint = utils.premultiplyTint(this._wallMaterial.color, 0.6);

        rightBorders.addChild(top);
        rightBorders.transform.setFromMatrix(Engine.LEFT_ISO_MATRIX);

        this.addChild(rightBorders);
    }

    private drawLeftBorder() {
        this._points = [
            { x: 0, y: 0 },
            { x: 32 + this._wallThickness * 2, y: 0 },
            { x: 32, y: 123 + (this._drawableTile.wallHeight + this._wallHeight) * 32 },
            { x: 0, y: 123 + (this._drawableTile.wallHeight + this._wallHeight) * 32 },
        ];

        const leftBorders = new Container();
        const leftTopBorder = new Graphics()
            .beginFill(0x989898)
            .moveTo(this._points[0].x - this._wallThickness * 2, this._points[0].y - this._wallThickness * 2)
            .lineTo(this._points[1].x - this._wallThickness * 2, this._points[1].y - this._wallThickness * 2)
            .lineTo(this._points[1].x, this._points[1].y)
            .lineTo(this._points[0].x, this._points[0].y);
        leftTopBorder.tint = utils.premultiplyTint(this._wallMaterial.color, 0.6);
        const leftLeftBorder = new Graphics()
            .beginFill(0xFFFFFF)
            .moveTo(this._points[0].x - this._wallThickness * 2, this._points[0].y - this._wallThickness * 2)
            .lineTo(this._points[0].x, this._points[0].y)
            .lineTo(this._points[3].x, this._points[3].y)
            .lineTo(this._points[3].x - this._wallThickness * 2, this._points[3].y - this._wallThickness * 2);
        leftTopBorder.tint = utils.premultiplyTint(this._wallMaterial.color, 1);

        leftBorders.transform.setFromMatrix(Engine.RIGHT_ISO_MATRIX);
        leftBorders.addChild(leftTopBorder);
        leftBorders.addChild(leftLeftBorder);
        this.addChild(leftBorders);
    }

    public drawParts(): void {
        const wallSize = 123 + (this._drawableTile.wallHeight + this._wallHeight) * 32;

        const leftTexturedPart = new TilingSprite(this._wallMaterial.texture, 32, wallSize);
        leftTexturedPart.transform.setFromMatrix(Engine.RIGHT_ISO_MATRIX);
        leftTexturedPart.tint = utils.premultiplyTint(this._wallMaterial.color, 0.85);

        const rightTexturedPart = new TilingSprite(this._wallMaterial.texture, 32, wallSize);
        rightTexturedPart.transform.setFromMatrix(Engine.LEFT_ISO_MATRIX);
        rightTexturedPart.tint = utils.premultiplyTint(this._wallMaterial.color, 1.1);
        rightTexturedPart.position.set(32, -16);

        this.addChild(leftTexturedPart, rightTexturedPart);

        this.drawLeftBorder();
        this.drawRightBorder();
    }
}

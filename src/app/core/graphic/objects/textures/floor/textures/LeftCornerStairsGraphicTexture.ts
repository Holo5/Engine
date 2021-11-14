import * as PIXI from 'pixi.js';
import { Engine } from '../../../../engine/Engine';
import { FloorGraphicTexture } from './FloorGraphicTexture';

export class LeftCornerStairsGraphicTexture extends FloorGraphicTexture {
    public drawParts(): void {
        this.addChild(
            this.drawPart(this._material, 8, 32, 24, 36, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 8, this._thickness, -8, 52, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 32, 32, 40, new PIXI.Matrix(0, 1, -1, 0.5), 0.8),
        );

        this.addChild(
            this.drawPart(this._material, 8, 24, 8, 28, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 8, this._thickness, -16, 40, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 24, 16, 32, new PIXI.Matrix(0, 1, -1, 0.5), 0.8),
        );

        this.addChild(
            this.drawPart(this._material, 8, 16, -8, 20, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 8, this._thickness, -24, 28, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 16, 0, 24, new PIXI.Matrix(0, 1, -1, 0.5), 0.8),
        );

        this.addChild(
            this.drawPart(this._material, 8, 8, -24, 12, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 8, this._thickness, -32, 16, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 8, -16, 16, new PIXI.Matrix(0, 1, -1, 0.5), 0.8),
        );
    }
}

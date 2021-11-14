import * as PIXI from 'pixi.js';
import { Engine } from '../../../../engine/Engine';
import { FloorGraphicTexture } from './FloorGraphicTexture';

export class RightCornerStairsGraphicTexture extends FloorGraphicTexture {
    public drawParts(): void {
        this.addChild(
            this.drawPart(this._material, 32, 8, -24, 36, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 32, this._thickness, -32, 40, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 8, 8, 52, new PIXI.Matrix(0, 1, -1, 0.5), 0.9),
        );

        this.addChild(
            this.drawPart(this._material, 24, 8, -8, 28, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 24, this._thickness, -16, 32, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 8, 16, 40, new PIXI.Matrix(0, 1, -1, 0.5), 0.9),
        );

        this.addChild(
            this.drawPart(this._material, 16, 8, 8, 20, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 16, this._thickness, 0, 24, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 8, 24, 28, new PIXI.Matrix(0, 1, -1, 0.5), 0.9),
        );

        this.addChild(
            this.drawPart(this._material, 8, 8, 24, 12, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 8, this._thickness, 16, 16, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 8, 32, 16, new PIXI.Matrix(0, 1, -1, 0.5), 0.9),
        );
    }
}

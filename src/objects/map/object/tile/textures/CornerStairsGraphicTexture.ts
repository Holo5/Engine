import { Engine } from '../../../../../Engine';
import { FloorGraphicTexture } from './FloorGraphicTexture';
import { Matrix } from 'pixi.js';

export class CornerStairsGraphicTexture extends FloorGraphicTexture {
    public drawParts(): void {
        this.addChild(
            this.drawPart(this._material, 32, 8, -24, 36, Engine.TOP_ISO_MATRIX, 1.1),
            this.drawPart(this._material, 8, 32, 24, 36, Engine.TOP_ISO_MATRIX, 1.1),
            this.drawPart(this._material, 32, this._thickness, -32, 40, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 32, 32, 40, new Matrix(0, 1, -1, 0.5), 0.8),
        );

        this.addChild(
            this.drawPart(this._material, 24, 8, -16, 24, Engine.TOP_ISO_MATRIX, 1.1),
            this.drawPart(this._material, 8, 24, 16, 24, Engine.TOP_ISO_MATRIX, 1.1),
            this.drawPart(this._material, 24, this._thickness, -24, 28, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 24, 24, 28, new Matrix(0, 1, -1, 0.5), 0.8),
        );

        this.addChild(
            this.drawPart(this._material, 16, 8, -8, 12, Engine.TOP_ISO_MATRIX, 1.1),
            this.drawPart(this._material, 8, 16, 8, 12, Engine.TOP_ISO_MATRIX, 1.1),
            this.drawPart(this._material, 16, this._thickness, -16, 16, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 16, 16, 16, new Matrix(0, 1, -1, 0.5), 0.8),
        );

        this.addChild(
            this.drawPart(this._material, 8, 8, 0, 0, Engine.TOP_ISO_MATRIX, 1.1),
            this.drawPart(this._material, 8, this._thickness, -8, 4, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 8, 8, 4, new Matrix(0, 1, -1, 0.5), 0.8),
        );
    }
}

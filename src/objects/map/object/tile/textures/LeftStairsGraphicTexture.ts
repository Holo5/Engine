import { Engine } from '../../../../../Engine';
import { FloorGraphicTexture } from './FloorGraphicTexture';
import { Matrix } from 'pixi.js';

export class LeftStairsGraphicTexture extends FloorGraphicTexture {
    public drawParts(): void {
        for (let i = 0; i < 4; i++) {
            this.addChild(
                this.drawPart(this._material, 32, 8, i * -8, (i * 12), Engine.TOP_ISO_MATRIX, 1.25),
                this.drawPart(this._material, 32, this._thickness, -8 + i * -8, 4 + (i * 12), Engine.LEFT_ISO_MATRIX, 1.1),
                this.drawPart(this._material, this._thickness, 8, 32 + i * -8, 16 + (i * 12), new Matrix(0, 1, -1, 0.5), 0.9),
            );
        }
    }
}

import * as PIXI from 'pixi.js';
import { Engine } from '../../../../engine/Engine';
import { FloorGraphicTexture } from './FloorGraphicTexture';

export class TileGraphicTexture extends FloorGraphicTexture {
    public drawParts(): void {
        this.addChild(
            this.drawPart(this._material, 32, 32, 0, 0, Engine.TOP_ISO_MATRIX, 1.25),
            this.drawPart(this._material, 32, this._thickness, -32, 16, Engine.LEFT_ISO_MATRIX, 1.1),
            this.drawPart(this._material, this._thickness, 32, 32, 16, new PIXI.Matrix(0, 1, -1, 0.5), 0.9),
        );
    }
}

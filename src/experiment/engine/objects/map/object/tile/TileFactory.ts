import { BaseImageResource, RenderTexture, Renderer } from 'pixi.js';
import { CornerStairsGraphicTexture } from './textures/CornerStairsGraphicTexture';
import { DrawableTile, FloorType } from '@holo5/roombuilder';
import { FloorGraphicTexture } from './textures/FloorGraphicTexture';
import { ITileOffset } from './interfaces/ITileOffset';
import { LeftCornerStairsGraphicTexture } from './textures/LeftCornerStairsGraphicTexture';
import { LeftStairsGraphicTexture } from './textures/LeftStairsGraphicTexture';
import { MaterialManager } from '../../material/MaterialManager';
import { RightCornerStairsGraphicTexture } from './textures/RightCornerStairsGraphicTexture';
import { RightStairsGraphicTexture } from './textures/RightStairsGraphicTexture';
import { TileGraphicTexture } from './textures/TileGraphicTexture';

export class TileFactory {

    private readonly cachedTexture: { [textureName: string]: RenderTexture };

    public constructor(
        private materialManager: MaterialManager,
        private renderer: Renderer,
    ) {
        this.cachedTexture = {};
    }

    public detectOffsets(drawableTile: DrawableTile): ITileOffset {
        let offsets = { x: 0, y: 0 };

        if (drawableTile.floorType === FloorType.FLOOR) {
            offsets = { x: -32, y: -16 };
        } else if (drawableTile.floorType === FloorType.RIGHT_STAIR_CASE) {
            offsets = { x: -32, y: -40 };
        } else if (drawableTile.floorType === FloorType.LEFT_CORNER) {
            offsets = { x: -32, y: -28 };
        } else if (drawableTile.floorType === FloorType.LEFT_STAIR_CASE || drawableTile.floorType === FloorType.FRONT_CORNER) {
            offsets = { x: -32, y: -40 };
        }

        return offsets;
    }

    private getTextureName(materialId: string, drawableTile: DrawableTile, floorThickness: number) {
        return `${materialId}_${floorThickness.toString()}_${drawableTile.floorType.toString()}`;
    }

    public getCachedGraphicTexture(materialId: string, drawableTile: DrawableTile, floorThickness: number): RenderTexture {
        const textureName = this.getTextureName(materialId, drawableTile, floorThickness);
        if (this.cachedTexture[textureName] !== undefined) {
            return this.cachedTexture[textureName];
        }

        const floorGraphicTexture = this.getTileGraphic(materialId, drawableTile, floorThickness);

        const graphicTexture = this.renderer.generateTexture(floorGraphicTexture);
        const image = this.renderer.plugins.extract.image(graphicTexture);

        graphicTexture.baseTexture.resource = new BaseImageResource(image);

        this.cachedTexture[textureName] = graphicTexture;

        return graphicTexture;
    }

    private getTileGraphic(materialId: string, drawableTile: DrawableTile, floorThickness: number): FloorGraphicTexture {
        if (drawableTile.floorType === FloorType.FLOOR) {
            return new TileGraphicTexture(this.materialManager.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.RIGHT_CORNER) {
            return new LeftCornerStairsGraphicTexture(this.materialManager.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.RIGHT_STAIR_CASE) {
            return new RightStairsGraphicTexture(this.materialManager.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.LEFT_STAIR_CASE) {
            return new LeftStairsGraphicTexture(this.materialManager.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.LEFT_CORNER) {
            return new RightCornerStairsGraphicTexture(this.materialManager.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.FRONT_CORNER) {
            return new CornerStairsGraphicTexture(this.materialManager.getFloorMaterial(materialId), floorThickness);
        }

        return new TileGraphicTexture(this.materialManager.getFloorMaterial(materialId), floorThickness);
    }
}

import { DrawableTile, FloorType, IVector3D, PositionComputer } from '@holo5/roombuilder';
import { Engine } from '../../engine/Engine';
import { TileTextureManager } from '../../managers/texture-manager/TileTextureManager';
import { TileGraphicTexture } from '../textures/floor/textures/TileGraphicTexture';
import { RightCornerStairsGraphicTexture } from '../textures/floor/textures/RightCornerStairsGraphicTexture';
import { RightStairsGraphicTexture } from '../textures/floor/textures/RightStairsGraphicTexture';
import { LeftStairsGraphicTexture } from '../textures/floor/textures/LeftStairsGraphicTexture';
import { LeftCornerStairsGraphicTexture } from '../textures/floor/textures/LeftCornerStairsGraphicTexture';
import { CornerStairsGraphicTexture } from '../textures/floor/textures/CornerStairsGraphicTexture';
import { Tile } from './Tile';
import { ITileOffset } from './interfaces/ITileOffset';
import { ICachedFloorTextureDictionnary } from '../textures/interfaces/ICachedTextureDictionnary';
import { FloorGraphicTexture } from '../textures/floor/textures/FloorGraphicTexture';
import { GraphicCacheManager } from '../object/cache/GraphicCacheManager';

export class TileFactory {
    public engine: Engine;
    private _graphicCacheManager: GraphicCacheManager;
    private _tileTextureManager: TileTextureManager;
    private _cachedTexture: ICachedFloorTextureDictionnary;

    public constructor(
        engine: Engine,
    ) {
        this.engine = engine;
        this._graphicCacheManager = this.engine.graphicCacheManager;
        this._tileTextureManager = this.engine.tileTextureManager;
        this._cachedTexture = {};
    }

    private getFloorMaterial(materialId: string) {
        return this._tileTextureManager.getFloorMaterial(materialId);
    }

    private detectOffset(drawableTile: DrawableTile): ITileOffset {
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

    public tileFromLocation(materialId: string, drawableTile: DrawableTile, floorThickness: number, mapPosition: IVector3D, screenPosition: IVector3D): Tile {
        const offsets = this.detectOffset(drawableTile);

        const tile = new Tile(drawableTile, offsets);
        tile.updateFromVectors(mapPosition, screenPosition);

        this._graphicCacheManager.requestCache({
            id: this.getTextureName(materialId, drawableTile, floorThickness),
            object: this.getCachedGraphicTexture(materialId, drawableTile, floorThickness),
        }, (renderableData) => {
            tile.setRenderableData(renderableData);
        });

        return tile;
    }

    getCachedGraphicTexture(materialId: string, drawableTile: DrawableTile, floorThickness: number) {
        const textureName = this.getTextureName(materialId, drawableTile, floorThickness);
        if (this._cachedTexture[textureName] !== undefined) {
            return this._cachedTexture[textureName];
        }

        const graphicTexture = this.getTileGraphic(materialId, drawableTile, floorThickness);
        this._cachedTexture[textureName] = graphicTexture;

        return graphicTexture;
    }

    getTileGraphic(materialId: string, drawableTile: DrawableTile, floorThickness: number): FloorGraphicTexture {
        if (drawableTile.floorType === FloorType.FLOOR) {
            return new TileGraphicTexture(this.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.RIGHT_CORNER) {
            return new LeftCornerStairsGraphicTexture(this.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.RIGHT_STAIR_CASE) {
            return new RightStairsGraphicTexture(this.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.LEFT_STAIR_CASE) {
            return new LeftStairsGraphicTexture(this.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.LEFT_CORNER) {
            return new RightCornerStairsGraphicTexture(this.getFloorMaterial(materialId), floorThickness);
        }
        if (drawableTile.floorType === FloorType.FRONT_CORNER) {
            return new CornerStairsGraphicTexture(this.getFloorMaterial(materialId), floorThickness);
        }

        return new TileGraphicTexture(this.getFloorMaterial(materialId), floorThickness);
    }
}

import { DrawableTile, IVector3D, WallType } from '@holo5/roombuilder';
import { Engine } from '../../engine/Engine';
import { TileTextureManager } from '../../managers/texture-manager/TileTextureManager';
import { CornerWallTexture } from '../textures/wall/textures/CornerWallTexture';
import { Wall } from './Wall';
import { LeftWallTexture } from '../textures/wall/textures/LeftWallTexture';
import { RightWallTexture } from '../textures/wall/textures/RightWallTexture';
import { DoorWallTexture } from '../textures/wall/textures/DoorWallTexture';
import { IWallOffset } from './interfaces/IWallOffset';
import { DisplayableZIndex } from '../enums/DisplayableZIndex';
import { ICachedWallTextureDictionnary } from '../textures/interfaces/ICachedTextureDictionnary';
import { WallGraphicTexture } from '../textures/wall/textures/WallGraphicTexture';
import { GraphicCacheManager } from '../object/cache/GraphicCacheManager';

export class WallFactory {
    public engine: Engine;
    private _graphicCacheManager: GraphicCacheManager;
    private _tileTextureManager: TileTextureManager;
    private _cachedTexture: ICachedWallTextureDictionnary;

    public constructor(
        engine: Engine,
    ) {
        this.engine = engine;
        this._graphicCacheManager = this.engine.graphicCacheManager;
        this._tileTextureManager = this.engine.tileTextureManager;
        this._cachedTexture = {};
    }

    private getWallGraphic(materialId: string, drawableTile: DrawableTile, wallHeight: number, wallThickness: number): WallGraphicTexture {
        const material = this._tileTextureManager.getWallMaterial(materialId);

        if (drawableTile.wallType === WallType.LEFT_WALL) {
            return new LeftWallTexture(material, drawableTile, wallHeight, wallThickness);
        }
        if (drawableTile.wallType === WallType.RIGHT_WALL) {
            return new RightWallTexture(material, drawableTile, wallHeight, wallThickness);
        }
        if (drawableTile.wallType === WallType.DOOR_WALL) {
            return new DoorWallTexture(material, drawableTile, wallHeight, wallThickness);
        }
        return new CornerWallTexture(material, drawableTile, wallHeight, wallThickness);
    }

    private getTextureName(materialId: string, drawableTile: DrawableTile, wallHeight: number, wallThickness: number): string {
        return `${materialId}_${drawableTile.wallHeight}_${wallThickness.toString()}_${drawableTile.wallType.toString()}_${wallHeight.toString()}`;
    }

    private detectOffset(drawableTile: DrawableTile, wallThickness: number, floorThickness: number): IWallOffset {
        let offsets = { x: 0, y: 0, z: 0 };

        if (drawableTile.wallType === WallType.CORNER_WALL) {
            offsets = { x: -32 - wallThickness * 2, y: 3 + floorThickness + (-3 + wallThickness), z: DisplayableZIndex.WALL };
        } else if (drawableTile.wallType === WallType.LEFT_WALL) {
            offsets = { x: -32 - wallThickness * 2, y: 3 + floorThickness + (-3 + wallThickness), z: DisplayableZIndex.WALL };
        } else if (drawableTile.wallType === WallType.RIGHT_WALL) {
            offsets = { x: -1, y: 3 + floorThickness + (-3 + wallThickness), z: DisplayableZIndex.WALL };
        } else if (drawableTile.wallType === WallType.DOOR_WALL) {
            offsets = { x: -wallThickness * 2, y: -67 + 3 + floorThickness + (-3 + wallThickness), z: DisplayableZIndex.DOORWALL };
        }

        offsets.y += floorThickness;

        return offsets;
    }

    getCachedGraphicTexture(materialId: string, drawableTile: DrawableTile, wallHeight: number, wallThickness: number) {
        const textureName = this.getTextureName(materialId, drawableTile, wallHeight, wallThickness);
        if (this._cachedTexture[textureName] !== undefined) {
            return this._cachedTexture[textureName];
        }

        const graphicTexture = this.getWallGraphic(materialId, drawableTile, wallHeight, wallThickness);
        this._cachedTexture[textureName] = graphicTexture;

        return graphicTexture;
    }

    public wallFromLocation(
        materialId: string,
        drawableTile: DrawableTile,
        wallHeight: number,
        wallThickness: number,
        floorThickness: number,
        mapPosition: IVector3D,
        screenPosition: IVector3D,
    ): Wall {
        const offsets = this.detectOffset(drawableTile, wallThickness, floorThickness);

        const wall = new Wall(drawableTile, offsets);
        wall.updateFromVectors(mapPosition, screenPosition);

        this._graphicCacheManager.requestCache({
            id: this.getTextureName(materialId, drawableTile, wallHeight, wallThickness),
            object: this.getCachedGraphicTexture(materialId, drawableTile, wallHeight, wallThickness),
        }, (renderableData) => {
            wall.setRenderableData(renderableData);
        });

        return wall;
    }
}

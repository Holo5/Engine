import { BaseImageResource, RenderTexture, Renderer } from 'pixi.js';
import { CornerWallTexture } from './textures/CornerWallTexture';
import { DoorWallTexture } from './textures/DoorWallTexture';
import { DrawableTile, WallType } from '@holo5/roombuilder';
import { IWallOffset } from './interfaces/IWallOffset';
import { LeftWallTexture } from './textures/LeftWallTexture';
import { MaterialManager } from '../../material/MaterialManager';
import { RightWallTexture } from './textures/RightWallTexture';
import { WallGraphicTexture } from './textures/WallGraphicTexture';
import {DisplayableZIndex} from '../../../../enums/DisplayableZIndex';

export class WallFactory {

    private cachedTexture: { [textureName: string]: RenderTexture };

    public constructor(
        private materialManager: MaterialManager,
        private renderer: Renderer,
    ) {
        this.cachedTexture = {};
    }

    private getWallGraphic(materialId: string, drawableTile: DrawableTile, wallHeight: number, wallThickness: number): WallGraphicTexture {
        const material = this.materialManager.getWallMaterial(materialId);

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

    public detectOffsets(drawableTile: DrawableTile, wallThickness: number, floorThickness: number): IWallOffset {
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

    getCachedGraphicTexture(materialId: string, drawableTile: DrawableTile, wallHeight: number, wallThickness: number): RenderTexture {
        const textureName = this.getTextureName(materialId, drawableTile, wallHeight, wallThickness);
        if (this.cachedTexture[textureName] !== undefined) {
            return this.cachedTexture[textureName];
        }

        const wallGraphicTexture = this.getWallGraphic(materialId, drawableTile, wallHeight, wallThickness);

        const graphicTexture = this.renderer.generateTexture(wallGraphicTexture);
        const image = this.renderer.plugins.extract.image(graphicTexture);

        graphicTexture.baseTexture.resource = new BaseImageResource(image);

        this.cachedTexture[textureName] = graphicTexture;

        return graphicTexture;
    }
}

import { Configuration } from '../../../../conf';
import { DrawableTile, FloorType, WallType } from '@holo5/roombuilder';
import { Engine } from '../../Engine';
import { ITileOffset } from './object/tile/interfaces/ITileOffset';
import { MaterialManager } from './material/MaterialManager';
import { Texture } from 'pixi.js';
import { TileFactory } from './object/tile/TileFactory';
import { WallFactory } from './object/wall/WallFactory';

export class MapModule {

    private materialManager: MaterialManager;
    private tileFactory: TileFactory;
    private wallFactory: WallFactory;

    constructor(
        public engine: Engine,
    ) {
        this.engine.assetsManager.has('room_data', Configuration.images.imageDomain + 'room/room.json');
        this.engine.assetsManager.has('room_spritesheet', Configuration.images.imageDomain + 'room/room_spritesheet.json');

        this.materialManager = new MaterialManager();
        this.tileFactory = new TileFactory(this.materialManager, this.engine.renderer);
        this.wallFactory = new WallFactory(this.materialManager, this.engine.renderer);
    }

    public init() {
        this.materialManager.init(this.engine.assetsManager.get('room_spritesheet').spritesheet, this.engine.assetsManager.get('room_data'));
    }

    public getTileTextureData(materialId: string, drawableTile: DrawableTile, floorThickness: number = 2): { texture: Texture; offset: ITileOffset } {
        return {
            texture: this.tileFactory.getCachedGraphicTexture(materialId, drawableTile, floorThickness),
            offset: this.tileFactory.detectOffsets(drawableTile),
        };
    }

    public getWallTextureData(
        materialId: string,
        drawableTile: DrawableTile,
        floorThickness: number,
        wallHeight: number = 0,
        wallThickness: number = 2,
    ): { texture: Texture; offset: ITileOffset } {
        return {
            texture: this.wallFactory.getCachedGraphicTexture(materialId, drawableTile, wallHeight, wallThickness),
            offset: this.wallFactory.detectOffsets(drawableTile, wallThickness, floorThickness),
        };
    }

    public getWallTest() {
        return this.wallFactory.getCachedGraphicTexture('101',
            new DrawableTile({
                x: 100,
                y: 100,
                z: 100,
            }, WallType.LEFT_WALL, FloorType.FLOOR, 0),
            2,
            3);
    }

}

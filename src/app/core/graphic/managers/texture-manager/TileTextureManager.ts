import * as PIXI from 'pixi.js';
import { IRoomTexturingData } from './Interfaces/IRoomTexturingData';
import { Material } from './Material';
import { Configuration } from '../../../../../conf';

export class TileTextureManager {
    private _loader: PIXI.Loader;
    private _floorMaterials: Map<string, Material>;
    private _wallMaterials: Map<string, Material>;
    private _sheet: PIXI.Spritesheet;

    constructor() {
        this._loader = new PIXI.Loader(`${Configuration.images.imageDomain}room/`, 3);
        this._floorMaterials = new Map<string, Material>();
        this._wallMaterials = new Map<string, Material>();
    }

    private async loadResources(): Promise<void> {
        if (this._floorMaterials.size > 0) return;

        await new Promise((resolve) => {
            this._loader
                .add('room.json', 'room.json', { crossOrigin: true })
                .add('spritesheet', 'room_spritesheet.json', { crossOrigin: true })
                .load(() => {
                    resolve(undefined);
                });
        });
    }

    private generateFloorTextures() {
        const { floorData } = this._roomData;
        // @ts-ignore
        this._sheet = this._loader.resources.spritesheet.spritesheet;

        const { textures } = floorData;
        const floors = Array.from(floorData.floors);

        floors.forEach((floor) => {
            const visualizations = Array.from(floor.visualizations);
            const visualization = visualizations.shift();

            const layers = Array.from(visualization.layers);
            const layer = layers.shift();

            const texture = textures.find((t) => t.id === layer.materialId);

            const bitmaps = Array.from(texture.bitmaps);
            const bitmap = bitmaps.shift();

            const { assetName } = bitmap;

            const material = new Material(layer.color, this._sheet.textures[`room_${assetName}.png`]);
            this._floorMaterials.set(floor.id, material);
        });
    }

    private generateWallTextures() {
        const { wallData } = this._roomData;
        // @ts-ignore
        this._sheet = this._loader.resources.spritesheet.spritesheet;

        const { textures } = wallData;
        const walls = Array.from(wallData.walls);

        walls.forEach((wall) => {
            const visualizations = Array.from(wall.visualizations);
            const visualization = visualizations.shift();

            const layers = Array.from(visualization.layers);
            const layer = layers.shift();

            const texture = textures.find((t) => t.id === layer.materialId);

            if (texture) {
                const bitmaps = Array.from(texture.bitmaps);
                const bitmap = bitmaps.shift();
                const { assetName } = bitmap;

                const material = new Material(layer.color, this._sheet.textures[`room_${assetName}.png`]);

                this._wallMaterials.set(wall.id, material);
            } else {
                const material = new Material(layer.color, PIXI.Texture.WHITE);

                this._wallMaterials.set(wall.id, material);
            }
        });
    }

    public async init() {
        await this.loadResources();

        this.generateFloorTextures();
        this.generateWallTextures();
    }

    public getFloorMaterial(id: string) {
        const material = this._floorMaterials.get(id);

        return material ?? this._floorMaterials.get('default');
    }

    public getWallMaterial(id: string) {
        const material = this._wallMaterials.get(id);

        return material ?? this._wallMaterials.get('default');
    }

    public getRandomFloorMaterial() {
        const keys = Array.from(this._floorMaterials.keys());

        const key = keys[Math.floor(Math.random() * keys.length)];

        return this._floorMaterials.get(key);
    }

    private get _roomData(): IRoomTexturingData {
        return this._loader.resources['room.json'].data;
    }
}

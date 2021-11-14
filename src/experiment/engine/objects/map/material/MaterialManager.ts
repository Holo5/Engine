import { IRoomTexturingData } from './Interfaces/IRoomTexturingData';
import { LoaderResource, Spritesheet, Texture } from 'pixi.js';
import { Material } from './Material';

export class MaterialManager {
    private floorMaterials: Map<string, Material>;
    private wallMaterials: Map<string, Material>;

    private roomData: IRoomTexturingData;
    private sheet: Spritesheet;

    constructor() {
        this.floorMaterials = new Map<string, Material>();
        this.wallMaterials = new Map<string, Material>();
    }

    private generateFloorTextures() {
        const { floorData } = this.roomData;

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

            const material = new Material(layer.color, this.sheet.textures[`room_${assetName}.png`]);
            this.floorMaterials.set(floor.id, material);
        });
    }

    private generateWallTextures() {
        const { wallData } = this.roomData;

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

                const material = new Material(layer.color, this.sheet.textures[`room_${assetName}.png`]);

                this.wallMaterials.set(wall.id, material);
            } else {
                const material = new Material(layer.color, Texture.WHITE);

                this.wallMaterials.set(wall.id, material);
            }
        });
    }

    public init(spritesheet: Spritesheet, roomDataResource: LoaderResource) {
        this.sheet = spritesheet;
        this.roomData = roomDataResource.data;

        this.generateFloorTextures();
        this.generateWallTextures();
    }

    public getFloorMaterial(id: string) {
        const material = this.floorMaterials.get(id);

        return material ?? this.floorMaterials.get('default');
    }

    public getWallMaterial(id: string) {
        const material = this.wallMaterials.get(id);

        return material ?? this.wallMaterials.get('default');
    }

    public getRandomFloorMaterial() {
        const keys = Array.from(this.floorMaterials.keys());

        const key = keys[Math.floor(Math.random() * keys.length)];

        return this.floorMaterials.get(key);
    }
}

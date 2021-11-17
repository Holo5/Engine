import { FurniData } from './FurniData';
import { IFurniData } from '../interfaces/IFurniData';

export class FurniDataManager {
    private _furniData: IFurniData;

    init(furniData: IFurniData) {
        this._furniData = furniData;
    }

    resolveSpriteIdFromDisplayName(itemDisplayName: string): number {
        const keys: string[] = Object.keys(this._furniData.floorItems);
        let spriteId = -1;

        for (let i = 0; i < keys.length; i++) {
            const index: number = parseInt(keys[i]);

            if (this._furniData.floorItems[index].className === itemDisplayName) {
                spriteId = this._furniData.floorItems[index].id;

                break;
            }
        }

        return spriteId;
    }

    resolveSpriteIdFromItemId(itemId: number): number {
        const keys: string[] = Object.keys(this._furniData.floorItems);
        let spriteId = -1;

        for (let i = 0; i < keys.length; i++) {
            const index: number = parseInt(keys[i]);

            if (this._furniData.floorItems[index].id === itemId) {
                spriteId = this._furniData.floorItems[index].id;

                break;
            }
        }

        return spriteId;
    }

    findFloorItem(spriteId: number): FurniData {
        const furni = this._furniData.floorItems[spriteId];

        if (furni !== undefined) {
            return new FurniData(
                furni.id,
                furni.className,
                furni.defaultdir,
                furni.xdim,
                furni.ydim,
                furni.name,
                furni.description,
                furni.customparams,
                furni.specialtype,
                furni.canstandon,
                furni.cansiton,
                furni.canlayon,
                furni.furniline,
                furni.rare,
            );
        }

        return undefined;
    }
}

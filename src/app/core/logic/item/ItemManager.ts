import { Vector3d } from '@holo5/roombuilder';
import { Item } from './Item';
import { ObjectManager } from '../ObjectManager';
import { AdsItem } from './AdsItem';

export class ItemManager extends ObjectManager<number, Item> {
    public addFloorItem(index: number, itemId: number, spriteId: number, x: number, y: number, direction: number, z: string, stackZ: string, state: string) {
        const item = new Item(this.engine, index, itemId, spriteId, new Vector3d(x, y, parseFloat(z)), state, direction, stackZ);
        item.buildGraphic();

        this.add(itemId, item);
    }

    public addAdsItem(index: number, itemId: number, spriteId: number, x: number, y: number, direction: number, z: string, stackZ: string, data: string[]) {
        const item = new AdsItem(this.engine, index, itemId, spriteId, new Vector3d(x, y, parseFloat(z)), direction, stackZ, data);
        item.buildGraphic();

        this.add(itemId, item);
    }

    public updateDirection(itemId: number, direction: number) {
        const item = this.find(itemId);
        if (item !== undefined) {
            item.updateDirection(direction);
        }
    }

    public updateState(itemId: number, state: string) {
        const item = this.find(itemId);
        if (item !== undefined) {
            item.updateState(state);
        }
    }

    public clear(): void {
    }
}

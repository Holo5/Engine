import { Incoming } from '../../../Incoming';
import { ItemManager } from '../../../../../../logic/item/ItemManager';
import { FloorItemType } from '../../../../../../logic/item/enum/FloorItemType';

export class ItemFloorEvent extends Incoming {
    public process(): void {
        const totalOwners = this.packet.readInt();
        const owners: Map<number, string> = new Map<number, string>();

        for (let i = 0; i < totalOwners; i++) {
            owners.set(this.packet.readInt(), this.packet.readString());
        }

        const totalItems = this.packet.readInt();

        for (let i = 0; i < totalItems; i++) {
            const itemId = this.packet.readInt();
            const spriteId = this.packet.readInt();
            const positionX = this.packet.readInt();
            const positionY = this.packet.readInt();
            const positionDirection = this.packet.readInt();
            const positionZ = this.packet.readString();
            const positionStackZ = this.packet.readString();

            const type1 = this.packet.readInt();
            const type2 = this.packet.readInt();

            // console.log(type1, type2);

            if (type1 === 1 && type2 === 0) {
                this.roomItem(i, itemId, spriteId, positionX, positionY, positionDirection, positionZ, positionStackZ);
            } else if (type1 === 0 && type2 === 1) {
                this.adsFloorItem(i, itemId, spriteId, positionX, positionY, positionDirection, positionZ, positionStackZ);
            } else if (type1 === 0 && type2 === 5) {
                const type3 = this.packet.readInt();

                if (type3 === 4) {
                    this.backgroundTonerItem(itemId, spriteId, positionX, positionY, positionDirection, positionZ, positionStackZ);
                }
            } else if (type1 === 0 && type2 === 2) {
                const type3 = this.packet.readInt();

                if (type3 === 4) {
                    this.badgeDisplay(itemId, spriteId, positionX, positionY, positionDirection, positionZ, positionStackZ);
                } else if (type3 === 5) {
                    this.groupItem(itemId, spriteId, positionX, positionY, positionDirection, positionZ, positionStackZ);
                }
            } else if (type1 === 0 && type2 === 6) {
                this.highScore(itemId, spriteId, positionX, positionY, positionDirection, positionZ, positionStackZ);
            }
        }

        // this.itemManager.display();
    }

    roomItem(
        index: number,
        itemId: number,
        spriteId: number,
        x: number,
        y: number,
        direction: number,
        z: string,
        stackZ: string,
    ) {
        const furniState = this.packet.readString();
        const unknownType = this.packet.readInt();
        const unknownExtraData1 = this.packet.readInt();
        const ownerId = this.packet.readInt();
        this.core.gameManager.itemManager.addFloorItem(index, itemId, spriteId, x, y, direction, z, stackZ, furniState);
    }

    adsFloorItem(
        index: number,
        itemId: number,
        spriteId: number,
        x: number,
        y: number,
        direction: number,
        z: string,
        stackZ: string,
    ) {
        const length = this.packet.readInt();
        const data: string[] = [];

        if (length > 0) {
            const realLength = length * 2;

            for (let i = 0; i < realLength; i++) {
                data.push(this.packet.readString());
            }
        }

        const unknownType = this.packet.readInt();
        const unknownExtraData1 = this.packet.readInt();
        const ownerId = this.packet.readInt();

        this.core.gameManager.itemManager.addAdsItem(index, itemId, spriteId, x, y, direction, z, stackZ, data);
    }

    backgroundTonerItem(
        itemId: number,
        spriteId: number,
        positionX: number,
        positionY: number,
        positionDirection: number,
        positionZ: string,
        positionStackZ: string,
    ) {
        const enabled = this.packet.readInt();
        if (enabled === 1) {
            const hue = this.packet.readInt() / 255;
            const saturation = this.packet.readInt() / 255;
            const lightness = this.packet.readInt() / 255;

            this.core.engine.sortableContainer.changeColor(hue, saturation, lightness);
        }

        const unknownType = this.packet.readInt();
        const unknownExtraData1 = this.packet.readInt();
        const ownerId = this.packet.readInt();
    }

    groupItem(
        itemId: number,
        spriteId: number,
        positionX: number,
        positionY: number,
        positionDirection: number,
        positionZ: string,
        positionStackZ: string,
    ) {
        const openState = this.packet.readString();
        const extraData = this.packet.readString();
        const badge = this.packet.readString();

        const color1 = this.packet.readString();
        const color2 = this.packet.readString();

        const unknownType = this.packet.readInt();
        const unknownExtraData1 = this.packet.readInt();
        const ownerId = this.packet.readInt();
    }

    badgeDisplay(
        itemId: number,
        spriteId: number,
        positionX: number,
        positionY: number,
        positionDirection: number,
        positionZ: string,
        positionStackZ: string,
    ) {
        const unknown = this.packet.readString();
        const badge = this.packet.readString();
        const creatorName = this.packet.readString();
        const date = this.packet.readString();

        const unknownType = this.packet.readInt();
        const unknownExtraData1 = this.packet.readInt();
        const ownerId = this.packet.readInt();
    }

    highScore(itemId: number, spriteId: number, x: number, y: number, direction: number, z: string, stackZ: string) {
        const state = this.packet.readString();
        const scoreType = this.packet.readInt();
        const clearType = this.packet.readInt();

        const size = this.packet.readInt();

        for (let i = 0; i < size; i++) {
            const score = this.packet.readInt();
            const userSize = this.packet.readInt();

            for (let j = 0; j < userSize; j++) {
                const name = this.packet.readString();
            }
        }

        const unknownType = this.packet.readInt();
        const unknownExtraData1 = this.packet.readInt();
        const ownerId = this.packet.readInt();
    }
}

import { Incoming } from '../Incoming';
import { ItemType } from '../../../../logic/inventory/enum/ItemType';
import { InventoryItem } from '../../../../logic/inventory/InventoryItem';
import { InventoryItemLimited } from '../../../../logic/inventory/InventoryItemLimited';
import { InventoryItemBadgeDisplay } from '../../../../logic/inventory/InventoryItemBadgeDisplay';
import { InventoryItemType } from '../../../../logic/inventory/enum/InventoryItemType';

export class UserItemsEvent extends Incoming {
    public async process() {
        const totalPage = this.packet.readInt();
        const currentPage = this.packet.readInt();
        const totalFurnitures = this.packet.readInt();

        const inventoryItems: InventoryItem[] = [];

        for (let i = 0; i < totalFurnitures; i++) {
            const virtualId = this.packet.readInt();
            const furniType = this.packet.readString();

            if (furniType.toLowerCase() === ItemType.WALL) {
                inventoryItems.push(this.wallItem());
            } else if (furniType.toLowerCase() === ItemType.FLOOR) {
                inventoryItems.push(this.floorItem());
            }
        }

        this.core.player.playerInventory.setInventoryItems(inventoryItems);
    }

    private floorItem() {
        const virtualId2 = this.packet.readInt();
        const spriteId = this.packet.readInt();
        let state: string;
        let groupId: string;
        let groupBadge: string;
        let colourA: string;
        let colourB: string;
        let badgeName: string;
        let creatorName: string;
        let createdDate: string;
        let limitedCount: number;
        let limitedCountTotal: number;

        const checkType = this.packet.readNextInt();

        if (checkType === 1) { // Not in group !
            const notInGroup = this.packet.readInt();
        }

        if (checkType === 17) {
            const inGroup = this.packet.readInt();
            const int2 = this.packet.readInt();
            const int3 = this.packet.readInt();

            if (int2 === 2 && int3 === 5) {
                state = this.packet.readString();
                groupId = this.packet.readString();
                groupBadge = this.packet.readString();

                colourA = this.packet.readString();
                colourB = this.packet.readString();
            }
        }

        const checkType2 = this.packet.readNextInt();

        if (checkType2 === 256) { // Limited
            const unknownString1 = this.packet.readString();
            const boolean1 = this.packet.readBoolean();
            const boolean2 = this.packet.readBoolean();
        } else if (checkType2 === 2) { // Badge display
            const badgeDisplay = this.packet.readInt();
        } else if (checkType2 === 0) { // Others
            const unknownInt1 = this.packet.readInt();
        }

        if (checkType2 === 2) {
            const unknownInt6 = this.packet.readInt();
            const unknownString2 = this.packet.readString();

            badgeName = this.packet.readString();
            creatorName = this.packet.readString();
            createdDate = this.packet.readString();
        } else if (checkType === 1) {
            const extraData = this.packet.readString();
        }

        if (checkType2 === 256) {
            limitedCount = this.packet.readInt();
            limitedCountTotal = this.packet.readInt();
        }

        const canRecycle = this.packet.readBoolean();
        const canTrade = this.packet.readBoolean();
        const canInventoryStack = this.packet.readBoolean();
        const canMarket = this.packet.readBoolean();

        const unknownInt3 = this.packet.readInt();
        const unknownBoolean1 = this.packet.readBoolean();
        const unknownInt4 = this.packet.readInt();
        const unknownString3 = this.packet.readString();
        const giftData = this.packet.readInt();

        if (checkType2 === 0 || checkType === 17) {
            return new InventoryItem(
                virtualId2,
                ItemType.FLOOR,
                InventoryItemType.REGULAR,
                spriteId,
                canRecycle,
                canTrade,
                canInventoryStack,
                canMarket,
            );
        }

        if (checkType2 === 256) {
            return new InventoryItemLimited(
                virtualId2,
                ItemType.FLOOR,
                InventoryItemType.LIMITED,
                spriteId,
                canRecycle,
                canTrade,
                canInventoryStack,
                canMarket,
                limitedCount,
                limitedCountTotal,
            );
        }

        if (checkType2 === 2) {
            return new InventoryItemBadgeDisplay(
                virtualId2,
                ItemType.FLOOR,
                InventoryItemType.BADGE_DISPLAY,
                spriteId,
                canRecycle,
                canTrade,
                canInventoryStack,
                canMarket,
                badgeName,
                creatorName,
                createdDate,
            );
        }

        return undefined;
    }

    private wallItem() {
        const virtualId2 = this.packet.readInt();
        const spriteId = this.packet.readInt();
        const definitionType = this.packet.readInt(); // 1(others), 2(wallpaper), 3(a2... ???), 4(landscape)

        const unknownInt1 = this.packet.readInt();
        const extraData = this.packet.readString();
        const canRecycle = this.packet.readBoolean();
        const canTrade = this.packet.readBoolean();
        const canInventoryStack = this.packet.readBoolean();
        const canMarket = this.packet.readBoolean();

        const unknownInt2 = this.packet.readInt();
        const unknownBoolean1 = this.packet.readBoolean();
        const unknownInt3 = this.packet.readInt();

        return new InventoryItem(
            virtualId2,
            ItemType.WALL,
            InventoryItemType.REGULAR,
            spriteId,
            canRecycle,
            canTrade,
            canInventoryStack,
            canMarket,
        );
    }
}

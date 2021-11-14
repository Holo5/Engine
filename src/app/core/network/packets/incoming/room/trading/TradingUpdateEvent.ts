import { Incoming } from '../../Incoming';
import { ItemType } from '../../../../../logic/inventory/enum/ItemType';
import { InventoryItemTrade } from '../../../../../logic/inventory/InventoryItemTrade';
import { InventoryItemType } from '../../../../../logic/inventory/enum/InventoryItemType';

export class TradingUpdateEvent extends Incoming {
    process(): void {
        this.processUser('sender');
        this.processUser('receiver');
    }

    private processUser(to: 'sender' | 'receiver'): void {
        const userId = this.packet.readInt();
        const itemsSize = this.packet.readInt();
        const items: InventoryItemTrade[] = [];

        for (let i = 0; i < itemsSize; i++) {
            items.push(this.processItem());
        }

        const itemsSize2 = this.packet.readInt();

        this.packet.readInt();

        this.core.gameManager.roomManager.tradeManager.updateTradingItems(userId, items);

        if (to === 'receiver') {
            this.core.gameManager.roomManager.tradeManager.updateOwnInventoryItemsState(items);
        }
    }

    private processItem(): InventoryItemTrade {
        const virtualId = this.packet.readInt();

        const itemType = this.packet.readString();
        const virtualId2 = this.packet.readInt();
        const spriteId = this.packet.readInt();

        this.packet.readInt();
        this.packet.readBoolean();

        let isGroupItem: boolean = false;
        let groupExist: boolean = false;
        let groupState: string;
        let groupId: string;
        let groupBadge: string;
        let groupBadgeColorA: string;
        let groupBadgeColorB: string;

        let extra: string;

        let isLimitedItem: boolean = false;
        let isBadgeDisplayItem: boolean = false;

        let limitedSize: number;
        let limitedTotal: number;

        const checkType = this.packet.readNextInt();

        if (checkType === 17) {
            isGroupItem = true;

            this.packet.readInt();

            const checkGroupExist = this.packet.readInt();

            if (checkGroupExist === 0) {
                groupExist = false;
            } else {
                groupExist = true;

                this.packet.readInt();

                groupState = this.packet.readString();
                groupId = this.packet.readString();
                groupBadge = this.packet.readString();
                groupBadgeColorA = this.packet.readString();
                groupBadgeColorB = this.packet.readString();
            }
        } else if (checkType === 256) {
            isLimitedItem = true;

            this.packet.readString();
            this.packet.readBoolean();
            this.packet.readBoolean();
        } else if (checkType === 2) {
            isBadgeDisplayItem = true;

            this.packet.readInt();
        } else {
            this.packet.readInt();
        }

        const checkType2 = this.packet.readNextInt();

        if (checkType2 === 4) {
            this.packet.readInt();
            this.packet.readString();

            extra = this.packet.readString();

            this.packet.readString();
            this.packet.readString();
        } else if (isGroupItem === false) {
            extra = this.packet.readString();
        }

        if (isLimitedItem) {
            limitedSize = this.packet.readInt();
            limitedTotal = this.packet.readInt();
        }

        this.packet.readInt();
        this.packet.readInt();
        this.packet.readInt();

        if (itemType.toLowerCase() === ItemType.FLOOR) {
            this.packet.readInt();
        }

        return new InventoryItemTrade(
            virtualId,
            this.resolveItemType(itemType),
            this.resolveInventoryItemType(isLimitedItem, isBadgeDisplayItem),
            spriteId,
        );
    }

    private resolveItemType(itemType: string): ItemType {
        if (itemType.toLowerCase() === ItemType.FLOOR) {
            return ItemType.FLOOR;
        }

        if (itemType.toLowerCase() === ItemType.WALL) {
            return ItemType.WALL;
        }

        return ItemType.EFFECT;
    }

    private resolveInventoryItemType(isLimitedItem: boolean, isBadgeDisplayItem: boolean): InventoryItemType {
        if (isLimitedItem) {
            return InventoryItemType.LIMITED;
        }

        if (isBadgeDisplayItem) {
            return InventoryItemType.BADGE_DISPLAY;
        }

        return InventoryItemType.REGULAR;
    }
}

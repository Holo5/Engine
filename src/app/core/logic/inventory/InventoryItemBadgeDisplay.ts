import { InventoryItem } from './InventoryItem';
import { ItemType } from './enum/ItemType';
import { InventoryItemType } from './enum/InventoryItemType';

export class InventoryItemBadgeDisplay extends InventoryItem {
    private _badgeName: string;
    private _creatorName: string;
    private _creationDate: string;

    constructor(
        virtualId: number,
        itemType: ItemType,
        inventoryItemType: InventoryItemType,
        spriteId: number,
        canRecycle: boolean,
        canTrade: boolean,
        canInventoryStack: boolean,
        canMarket: boolean,
        badgeName: string,
        creatorName: string,
        creationDate: string,
    ) {
        super(virtualId, itemType, inventoryItemType, spriteId, canRecycle, canTrade, canInventoryStack, canMarket);

        this._badgeName = badgeName;
        this._creatorName = creatorName;
        this._creationDate = creationDate;
    }
}

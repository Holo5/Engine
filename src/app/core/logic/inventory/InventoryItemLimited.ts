import { InventoryItem } from './InventoryItem';
import { ItemType } from './enum/ItemType';
import { InventoryItemType } from './enum/InventoryItemType';

export class InventoryItemLimited extends InventoryItem {
    private _limitedCount: number;
    private _limitedCountTotal: number;

    constructor(
        virtualId: number,
        itemType: ItemType,
        inventoryItemType: InventoryItemType,
        spriteId: number,
        canRecycle: boolean,
        canTrade: boolean,
        canInventoryStack: boolean,
        canMarket: boolean,
        limitedCount: number,
        limitedCountTotal: number,
    ) {
        super(virtualId, itemType, inventoryItemType, spriteId, canRecycle, canTrade, canInventoryStack, canMarket);

        this._limitedCount = limitedCount;
        this._limitedCountTotal = limitedCountTotal;
    }
}

import { InventoryItem } from './InventoryItem';
import { ItemType } from './enum/ItemType';
import { InventoryItemType } from './enum/InventoryItemType';
import { FurniData } from '../../graphic/objects/room/items/item-module/assets-manager/FurniData';

export class InventoryItemCollection extends InventoryItem {
    public inventoryItems: InventoryItem[];
    public furniData: FurniData;

    constructor(
        virtualId: number,
        itemType: ItemType,
        inventoryItemType: InventoryItemType,
        spriteId: number,
        canRecycle: boolean,
        canTrade: boolean,
        canInventoryStack: boolean,
        canMarket: boolean,
        furniData?: FurniData,
    ) {
        super(virtualId, itemType, inventoryItemType, spriteId, canRecycle, canTrade, canInventoryStack, canMarket);

        this.inventoryItems = [];
        this.furniData = furniData ?? null;
    }

    static fromInventoryItem(inventoryItem: InventoryItem): InventoryItemCollection {
        return new InventoryItemCollection(
            inventoryItem.virtualId,
            inventoryItem.itemType,
            inventoryItem.inventoryItemType,
            inventoryItem.spriteId,
            inventoryItem.canRecycle,
            inventoryItem.canTrade,
            inventoryItem.canInventoryStack,
            inventoryItem.canMarket,
            inventoryItem.furniData,
        );
    }

    addInventoryItem(inventoryItem: InventoryItem) {
        this.inventoryItems.push(inventoryItem);
        this._quantity++;
    }
}

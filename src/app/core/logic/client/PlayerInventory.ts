import { InventoryItem } from '../inventory/InventoryItem';
import { Core } from '../../Core';
import { InventoryItemType } from '../inventory/enum/InventoryItemType';
import { InventoryItemCollection } from '../inventory/InventoryItemCollection';
import { FurniData } from '../../graphic/objects/room/items/item-module/assets-manager/FurniData';

export class PlayerInventory {
    private _inventoryItems: InventoryItem[];
    private _inventoryItemCollection: InventoryItem[];

    constructor(public core: Core) {
        this._inventoryItems = [];
        this._inventoryItemCollection = [];
    }

    highlightItem(virtualId: number) {
        this.core.store.commit('inventory/HIGHTLIGHT_ITEM', virtualId);
    }

    setInventoryItems(inventoryItems: InventoryItem[]) {
        this._inventoryItems = inventoryItems;

        this.buildCollection();
    }

    findBySpriteId(spriteId: number) {
        return this._inventoryItems.find((inventoryItem) => inventoryItem.spriteId === spriteId);
    }

    findByVirtualId(virtualId: number) {
        return this._inventoryItems.find((inventoryItem) => inventoryItem.virtualId === virtualId);
    }

    removeInventoryItem(virtualId: number) {
        const itemToDelete = this._inventoryItems.find((inventoryItem) => inventoryItem.virtualId === virtualId);

        if (itemToDelete !== undefined) {
            this._inventoryItems.splice(this._inventoryItems.indexOf(itemToDelete), 1);
            this.buildCollection();
        }
    }

    async resolveItemFurniData(inventoryItem: InventoryItem | InventoryItemCollection): Promise<FurniData> {
        if (inventoryItem.furniData !== null) {
            return inventoryItem.furniData;
        }

        const furniData: FurniData = await this.core.engine.itemModule.getInventoryItemFurniData(inventoryItem.spriteId);

        inventoryItem.furniData = furniData;

        if (inventoryItem instanceof InventoryItemCollection) {
            inventoryItem.inventoryItems = inventoryItem.inventoryItems.map((item: InventoryItem) => {
                item.furniData = furniData;

                return item;
            });
        }

        return furniData;
    }

    buildCollection() {
        this._inventoryItemCollection = this.compute(this._inventoryItems);
        this._inventoryItemCollection = this.sortByHighlighted(this._inventoryItemCollection);

        this.core.store.commit('inventory/setInventoryItems', this._inventoryItemCollection);
    }

    sortByHighlighted(inventoryItems: InventoryItem[]): InventoryItem[] {
        const allHighlightedIds: number[] = this.core.store.getters['inventory/highlightedItemsVirtualIds'];

        return inventoryItems.sort((a: InventoryItem) => (allHighlightedIds.includes(a.virtualId) ? -1 : 1));
    }

    compute(inventoryItems: InventoryItem[]): InventoryItem[] {
        const newInventoryItems: InventoryItem[] = [];

        inventoryItems.forEach((inventoryItem) => {
            if (inventoryItem.inventoryItemType === InventoryItemType.REGULAR && inventoryItem.canInventoryStack === true) {
                const inventoryItemCollection: InventoryItemCollection = newInventoryItems.find((value) => value.canInventoryStack === true && value.spriteId === inventoryItem.spriteId) as InventoryItemCollection;

                if (inventoryItemCollection !== undefined) {
                    inventoryItemCollection.addInventoryItem(inventoryItem);
                } else {
                    newInventoryItems.push(InventoryItemCollection.fromInventoryItem(inventoryItem));
                }
            } else {
                newInventoryItems.push(inventoryItem);
            }
        });

        newInventoryItems.forEach((furniInventoryItem) => {
            furniInventoryItem.iconUrl = this.core.engine.itemModule.buildIcon(furniInventoryItem.spriteId);
        });

        return newInventoryItems;
    }

    public get inventoryItemCollection(): InventoryItem[] {
        return this._inventoryItemCollection;
    }
}

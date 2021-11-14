import { InventoryItemType } from './enum/InventoryItemType';
import { ItemType } from './enum/ItemType';
import { FurniData } from '../../graphic/objects/room/items/item-module/assets-manager/FurniData';

export class InventoryItemTrade {
    private _virtualId: number;
    private _itemType: ItemType;
    private _inventoryItemType: InventoryItemType;
    private _spriteId: number;
    private _quantity: number;
    private _iconUrl: string;
    private _furniData: FurniData;

    constructor(
        virtualId: number,
        itemType: ItemType,
        inventoryItemType: InventoryItemType,
        spriteId: number,
    ) {
        this._virtualId = virtualId;
        this._itemType = itemType;
        this._inventoryItemType = inventoryItemType;
        this._spriteId = spriteId;
        this._quantity = 1;
    }

    get furniData(): FurniData {
        return this._furniData;
    }

    set furniData(value: FurniData) {
        this._furniData = value;
    }

    get iconUrl(): string {
        return this._iconUrl;
    }

    set iconUrl(iconUrl: string) {
        this._iconUrl = iconUrl;
    }

    get virtualId(): number {
        return this._virtualId;
    }

    set virtualId(value: number) {
        this._virtualId = value;
    }

    get itemType(): ItemType {
        return this._itemType;
    }

    set itemType(value: ItemType) {
        this._itemType = value;
    }

    get inventoryItemType(): InventoryItemType {
        return this._inventoryItemType;
    }

    set inventoryItemType(value: InventoryItemType) {
        this._inventoryItemType = value;
    }

    get spriteId(): number {
        return this._spriteId;
    }

    set spriteId(value: number) {
        this._spriteId = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }
}

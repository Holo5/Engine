import { ItemType } from './enum/ItemType';
import { InventoryItemType } from './enum/InventoryItemType';
import { FurniData } from '../../graphic/objects/room/items/item-module/assets-manager/FurniData';

export class InventoryItem {
    public furniData: FurniData;
    protected _virtualId: number;
    protected _itemType: ItemType;
    protected _inventoryItemType: InventoryItemType;
    protected _spriteId: number;
    protected _canRecycle: boolean;
    protected _canTrade: boolean;
    protected _canInventoryStack: boolean;
    protected _canMarket: boolean;
    protected _quantity: number;
    private _iconUrl: string;

    constructor(
        virtualId: number,
        itemType: ItemType,
        inventoryItemType: InventoryItemType,
        spriteId: number,
        canRecycle: boolean,
        canTrade: boolean,
        canInventoryStack: boolean,
        canMarket: boolean,
    ) {
        this._virtualId = virtualId;
        this._itemType = itemType;
        this._inventoryItemType = inventoryItemType;
        this._spriteId = spriteId;
        this._canRecycle = canRecycle;
        this._canTrade = canTrade;
        this._canInventoryStack = canInventoryStack;
        this._canMarket = canMarket;
        this._quantity = 1;
        this.furniData = null;
    }

    public get iconUrl(): string {
        return this._iconUrl;
    }

    public set iconUrl(value: string) {
        this._iconUrl = value;
    }

    public get virtualId(): number {
        return this._virtualId;
    }

    public get itemType(): ItemType {
        return this._itemType;
    }

    public get inventoryItemType(): InventoryItemType {
        return this._inventoryItemType;
    }

    public get spriteId(): number {
        return this._spriteId;
    }

    public get canRecycle(): boolean {
        return this._canRecycle;
    }

    public get canTrade(): boolean {
        return this._canTrade;
    }

    public get canInventoryStack(): boolean {
        return this._canInventoryStack;
    }

    public get canMarket(): boolean {
        return this._canMarket;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
    }
}

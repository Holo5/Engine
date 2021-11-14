import { Core } from '../../Core';
import { InventoryItemTrade } from '../inventory/InventoryItemTrade';
import { Manager } from '../Manager';

export class TradeManager extends Manager {
    private _receiverId: number;
    private _receiverLocked: boolean;
    private _receiverItems: InventoryItemTrade[];

    private _senderId: number;
    private _senderLocked: boolean;
    private _senderItems: InventoryItemTrade[];

    private _state: number;

    constructor(public core: Core) {
        super(core);

        this._receiverId = 0;
        this._senderId = 0;
        this._state = 0;
        this._receiverLocked = false;
        this._senderLocked = false;
    }

    private compute(itemsTrade: InventoryItemTrade[]): InventoryItemTrade[] {
        const newItemsTrade: InventoryItemTrade[] = [];

        itemsTrade.forEach((inventoryItem: InventoryItemTrade) => {
            const currentItem: InventoryItemTrade = newItemsTrade.find((item) => item.spriteId === inventoryItem.spriteId) as InventoryItemTrade;

            if (currentItem !== undefined) {
                currentItem.quantity++;
            } else {
                inventoryItem.furniData = this.core.engine.itemModule.getInventoryItemFurniData(inventoryItem.spriteId);

                newItemsTrade.push(inventoryItem);
            }
        });

        newItemsTrade.forEach((inventoryItem: InventoryItemTrade) => {
            inventoryItem.iconUrl = this.core.engine.itemModule.buildIcon(inventoryItem.spriteId);
        });

        return newItemsTrade;
    }

    public start(receiverId: number, senderId: number): void {
        this._receiverId = receiverId;
        this._senderId = senderId;
        this.state = 0;

        const username: string = this.gameManager.unitManager.findByUserId(senderId).username;

        this.core.store.dispatch('trade/startTrading', username);
    }

    public close(): void {
        this._receiverId = 0;
        this._senderId = 0;
        this._state = 0;
        this._receiverItems = [];
        this._senderItems = [];

        this.core.store.dispatch('trade/stopTrading');
    }

    public updateTradingItems(userId: number, items: InventoryItemTrade[]): void {
        const computedItems = this.compute(items);

        if (userId === this._senderId) {
            this._senderItems = computedItems;

            this.core.store.commit('trade/setUserItems', computedItems);
        } else {
            this._receiverItems = computedItems;

            this.core.store.commit('trade/setSelfItems', computedItems);
        }
    }

    public updateLockedState(userId: number, state: boolean): void {
        if (userId === this._receiverId) {
            this._receiverLocked = state;

            if (state === true) {
                this.core.store.commit('trade/setTradeState', 1);
            } else {
                this.core.store.commit('trade/setTradeState', 0);
            }

            this.core.store.commit('trade/setSelfLockState', state);
        }

        if (userId === this._senderId) {
            this._senderLocked = state;

            this.core.store.commit('trade/setUserLockState', state);
        }
    }

    public startCountdown(): void {
        this.core.store.commit('trade/setTradeState', 2);
        this.core.store.dispatch('trade/countdown', 3);
    }

    public updateOwnInventoryItemsState(items: InventoryItemTrade[]): void {
        const itemsQuantity: { spriteId: number, quantity: number }[] = [];

        items.forEach((item: InventoryItemTrade) => {
            const found = itemsQuantity.find((iq) => iq.spriteId === item.spriteId);

            if (found) {
                found.quantity++;
            } else {
                itemsQuantity.push({ spriteId: item.spriteId, quantity: 1 });
            }
        });

        itemsQuantity.forEach((iq) => {
            this.core.store.dispatch('inventory/substractItemQuantity', {
                spriteId: iq.spriteId,
                subQuantity: iq.quantity,
            });
        });
    }

    public clear(): void {
    }

    set state(num: number) {
        this._state = num;

        this.core.store.commit('trade/setTradeState', num);
    }
}

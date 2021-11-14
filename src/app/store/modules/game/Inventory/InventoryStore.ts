import { Module } from 'vuex';
import { InventoryItem } from '../../../../core/logic/inventory/InventoryItem';
import { Badge } from '../../../../core/logic/badge/Badge';
import { SlotBadgeComposer } from '../../../../core/network/packets/outgoing/user/profile/SlotBadgeComposer';
import { InventoryItemCollection } from '../../../../core/logic/inventory/InventoryItemCollection';
import { ITempItemTradeQuantity } from './Interface/ITempItemTradeQuantity';

interface IStateInterface {
    inventoryDisplayed: boolean;
    currentLayout: 'items' | 'pets' | 'badges' | 'bots';
    inventoryItems: InventoryItem[];
    currentItem: InventoryItem;
    inventoryBadges: Badge[];
    currentBadge: Badge;
    tempInventoryItemsQuantity: ITempItemTradeQuantity[];
    highlightedItemsVirtualIds: number[];
}

export const InventoryModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        inventoryDisplayed: false,
        currentLayout: 'items',
        inventoryItems: [],
        currentItem: null,
        inventoryBadges: [],
        currentBadge: null,
        tempInventoryItemsQuantity: [],
        highlightedItemsVirtualIds: [],
    },
    getters: {
        badgeSelected: (state) => state.inventoryBadges.filter((badge: Badge) => badge.name === state.currentBadge?.name)[0],
        badgesSlotted: (state) => state.inventoryBadges.filter((badge: Badge) => badge.slot > 0),
        badgesNotSlotted: (state) => state.inventoryBadges.filter((badge: Badge) => badge.slot <= 0),
        highlightedItemsVirtualIds: (state) => state.highlightedItemsVirtualIds,
    },
    actions: {
        selectItem: ({ commit, dispatch }, item: any) => {
            commit('removeHighlightItem', item.virtualId);

            dispatch('bridge/loadItemFurniData', item, { root: true }).then(() => {
                if (item instanceof InventoryItemCollection && item.inventoryItems.length > 0) {
                    commit('setCurrentItem', item.inventoryItems[0]);
                } else {
                    commit('setCurrentItem', item);
                }
            });
        },
        selectBadge: ({ commit }, badge: Badge) => {
            commit('setCurrentBadge', badge);
        },
        slotBadges: ({ commit, getters }) => {
            const badges: Badge[] = getters.badgesSlotted.concat(getters.badgeSelected);

            commit('network/composePacket', new SlotBadgeComposer(badges), { root: true });
        },
        unslotBadges: ({ commit, getters }, unslottedBadge: Badge) => {
            const badges: Badge[] = getters.badgesSlotted.filter((badge: Badge) => badge.name !== unslottedBadge.name);

            commit('network/composePacket', new SlotBadgeComposer(badges), { root: true });
        },
        substractItemQuantity: ({ state, commit }, payload: { spriteId: number, subQuantity: number }) => {
            const newInventoryItems = state.inventoryItems.map((item) => {
                if (item.spriteId === payload.spriteId) {
                    const temp = state.tempInventoryItemsQuantity.find((tempItem: ITempItemTradeQuantity) => tempItem.spriteId === item.spriteId);

                    if (!temp) {
                        commit('addInventoryItemTemp', {
                            spriteId: item.spriteId,
                            quantity: item.quantity,
                        });

                        item.quantity -= payload.subQuantity;
                    } else {
                        item.quantity = temp.quantity - payload.subQuantity;
                    }
                }

                return item;
            });

            commit('setInventoryItems', newInventoryItems);
        },
        revertSubstract: ({ state, commit }) => {
            state.tempInventoryItemsQuantity.forEach((tempItemTrade: ITempItemTradeQuantity) => {
                const inventoryItem: InventoryItem = state.inventoryItems.find((item: InventoryItem) => item.spriteId === tempItemTrade.spriteId) as InventoryItem;

                inventoryItem.quantity = tempItemTrade.quantity;
            });

            commit('cleanItemTemp');
        },
    },
    mutations: {
        addInventoryItemTemp: (state: IStateInterface, payload: ITempItemTradeQuantity) => {
            state.tempInventoryItemsQuantity.push(payload);
        },
        cleanItemTemp: (state: IStateInterface, payload) => {
            state.tempInventoryItemsQuantity = [];
        },
        toggleInventory: (state) => {
            state.inventoryDisplayed = !state.inventoryDisplayed;

            if (!state.inventoryDisplayed) {
                state.highlightedItemsVirtualIds = [];
            }
        },
        setInventoryDisplayed: (state: IStateInterface, display: boolean) => {
            state.inventoryDisplayed = display;

            if (!display) {
                state.highlightedItemsVirtualIds = [];
            }
        },
        setInventoryItems: (state: IStateInterface, inventoryItems: InventoryItem[]) => {
            state.inventoryItems = inventoryItems;
        },
        highlightItem: (state: IStateInterface, virtualId: number) => {
            state.highlightedItemsVirtualIds.push(virtualId);
        },
        removeHighlightItem: (state: IStateInterface, itemId: number) => {
            state.highlightedItemsVirtualIds = state.highlightedItemsVirtualIds.filter((virtualId: number) => virtualId !== itemId);
        },
        setCurrentItem: (state: IStateInterface, item: InventoryItem) => {
            state.currentItem = item;
        },
        setLayout: (state: IStateInterface, layout: 'items' | 'pets' | 'badges' | 'bots') => {
            state.currentLayout = layout;
        },
        setInventoryBadges: (state: IStateInterface, badges: Badge[]) => {
            state.inventoryBadges = badges;
        },
        setCurrentBadge: (state: IStateInterface, badge: Badge) => {
            state.currentBadge = badge;
        },
        updateBadge: (state: IStateInterface, badge: Badge) => {
            state.inventoryBadges = state.inventoryBadges.map((currentBadge: Badge) => {
                if (currentBadge.name === badge.name) {
                    currentBadge.slot = badge.slot;
                    currentBadge.textName = badge.textName;
                    currentBadge.textDesc = badge.textDesc;
                }

                return currentBadge;
            });
        },
    },
};

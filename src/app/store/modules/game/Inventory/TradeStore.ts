import { Module } from 'vuex';
import { CancelTradingComposer } from '../../../../core/network/packets/outgoing/room/trade/CancelTradingComposer';
import { InventoryItem } from '../../../../core/logic/inventory/InventoryItem';
import { InventoryItemTrade } from '../../../../core/logic/inventory/InventoryItemTrade';
import { TradingOfferItemComposer } from '../../../../core/network/packets/outgoing/room/trade/TradingOfferItemComposer';
import { TradingOfferItemsComposer } from '../../../../core/network/packets/outgoing/room/trade/TradingOfferItemsComposer';
import { TradingRemoveItemMessage } from '../../../../core/network/packets/outgoing/room/trade/TradingRemoveItemMessage';
import { AcceptTradeComposer } from '../../../../core/network/packets/outgoing/room/trade/AcceptTradeComposer';
import { UnacceptTradeComposer } from '../../../../core/network/packets/outgoing/room/trade/UnacceptTradeComposer';
import { TradingConfirmComposer } from '../../../../core/network/packets/outgoing/room/trade/TradingConfirmComposer';

interface IStateInterface {
    tradeEnabled: boolean;
    tradeState: number;
    topButtonState: 'inventory' | 'trade';
    currentItem: InventoryItem;
    currentItemSize: number;
    username: string;
    userLockState: boolean;
    selfLockState: boolean;
    userItems: InventoryItemTrade[];
    selfItems: InventoryItemTrade[];
    countdown: number;
}

export const TradeModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        tradeEnabled: false,
        tradeState: 0,
        topButtonState: 'inventory',
        currentItem: null,
        currentItemSize: 1,
        username: '',
        userLockState: false,
        selfLockState: false,
        userItems: [],
        selfItems: [],
        countdown: 0,
    },
    actions: {
        startTrading: ({ commit }, username: string) => {
            commit('setUser', username);
            commit('setTradeEnabled', true);
            commit('setSelfLockState', false);
            commit('setUserLockState', false);
            commit('inventory/setInventoryDisplayed', true, { root: true });
        },
        stopTrading: ({ commit, dispatch }) => {
            commit('network/composePacket', new CancelTradingComposer(), { root: true });
            commit('setTradeEnabled', false);
            commit('setTradeState', 0);
            dispatch('inventory/revertSubstract', null, { root: true });
            commit('emptyInventoryItems');
            commit('setUser', null);
        },
        tradeItem: ({ state, commit }) => {
            const amount: number = state.currentItemSize;
            const virtualId: number = state.currentItem.virtualId;

            if (amount < 1) {
                commit('network/composePacket', new TradingOfferItemComposer(virtualId), { root: true });
            } else {
                commit('network/composePacket', new TradingOfferItemsComposer(virtualId, amount), { root: true });
            }
        },
        selectTradeItem: ({ state, commit }, item: InventoryItemTrade) => {
            commit('setTopButtonState', 'trade');
            commit('setCurrentItem', item);
            commit('setCurrentItemSize', 1);
        },
        untradeItem: ({ state, commit }) => {
            commit('network/composePacket', new TradingRemoveItemMessage(state.currentItem.virtualId), { root: true });
        },
        acceptTrade: ({ commit }) => {
            commit('network/composePacket', new AcceptTradeComposer(), { root: true });
        },
        editTrade: ({ commit }) => {
            commit('network/composePacket', new UnacceptTradeComposer(), { root: true });
        },
        countdown: ({ state, dispatch, commit }, seconds: number = 3) => {
            commit('setCountdown', seconds);

            if (seconds <= 0) {
                commit('setTradeState', 3);
            } else {
                setTimeout(() => {
                    dispatch('countdown', seconds - 1);
                }, 1000);
            }
        },
        confirmTrade: ({ commit }) => {
            commit('network/composePacket', new TradingConfirmComposer(), { root: true });
        },
    },
    mutations: {
        setCountdown: (state: IStateInterface, countdown: number) => {
            state.countdown = countdown;
        },
        setTopButtonState: (state: IStateInterface, buttonState: 'inventory' | 'trade') => {
            state.topButtonState = buttonState;
        },
        setTradeEnabled: (state: IStateInterface, enabled: boolean) => {
            state.tradeEnabled = enabled;
        },
        setTradeState: (state: IStateInterface, num: number) => {
            state.tradeState = num;
        },
        setCurrentItem: (state: IStateInterface, item: InventoryItem) => {
            state.currentItem = item;
        },
        setCurrentItemSize: (state: IStateInterface, size: number) => {
            state.currentItemSize = size;
        },
        setUser: (state: IStateInterface, username: string) => {
            state.username = username;
        },
        setSelfLockState: (state: IStateInterface, lockState: boolean) => {
            state.selfLockState = lockState;
        },
        setUserLockState: (state: IStateInterface, lockState: boolean) => {
            state.userLockState = lockState;
        },
        setSelfItems: (state: IStateInterface, items: InventoryItemTrade[]) => {
            state.selfItems = items;
        },
        setUserItems: (state: IStateInterface, items: InventoryItemTrade[]) => {
            state.userItems = items;
        },
        emptyInventoryItems: (state: IStateInterface) => {
            state.userItems = [];
            state.selfItems = [];
        },
    },
};

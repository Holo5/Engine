import { Module } from 'vuex';
import { CatalogPage } from '../../../../core/logic/catalog/CatalogPage';
import { CatalogPageItems } from '../../../../core/logic/catalog/CatalogPageItems';
import { CatalogItem } from '../../../../core/logic/catalog/items/CatalogItem';
import { GiftWrappingConfiguration } from '../../../../core/logic/catalog/data/GiftWrappingConfiguration';
import { CatalogPageRequestComposer } from '../../../../core/network/packets/outgoing/catalog/CatalogPageRequestComposer';
import { GetGiftWrappingConfigurationComposer } from '../../../../core/network/packets/outgoing/catalog/GetGiftWrappingConfigurationComposer';

interface IStateInterface {
    catalogDisplayed: boolean;
    catalogPages: CatalogPage[];
    catalogSecondCategoriesPages: CatalogPage[];
    actualCatalogCaption: string;
    catalogPagesItems: Map<number, CatalogPageItems>;
    actualCatalogPage: CatalogPage | false;
    actualPage: CatalogPageItems | false;
    actualCatalogItem: CatalogItem | false;
    actualCatalogItemQuantity: number;
    actualItemIndex: number;
    changeEvent: 'clicked' | 'not-clicked';
    buyConfirmationDisplayed: boolean;
    sendGiftDisplayed: boolean;
    giftWrappingConfiguration: GiftWrappingConfiguration;
    currentBoxType: number;
    friendName: string;
    giftContent: string;
}

export const CatalogModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        catalogDisplayed: false,
        catalogPages: [],
        catalogSecondCategoriesPages: [],
        actualCatalogCaption: '',
        catalogPagesItems: new Map<number, CatalogPageItems>(),
        actualCatalogPage: false,
        actualPage: false,
        actualCatalogItem: false,
        actualCatalogItemQuantity: 1,
        actualItemIndex: -1,
        changeEvent: 'not-clicked',
        buyConfirmationDisplayed: false,
        sendGiftDisplayed: false,
        giftWrappingConfiguration: null,
        currentBoxType: 1,
        friendName: '',
        giftContent: '',
    },
    getters: {
        actualItem: (state: IStateInterface): CatalogItem | null => (state.actualPage ? state.actualPage.catalogItems[state.actualItemIndex] : null),
    },
    mutations: {
        setFriendName: (state: IStateInterface, friendName: string) => {
            state.friendName = friendName;
        },
        setGiftContent: (state: IStateInterface, content: string) => {
            state.giftContent = content;
        },
        toggleCatalog: (state: IStateInterface) => {
            state.catalogDisplayed = !state.catalogDisplayed;
        },
        displayCatalog: (state: IStateInterface) => {
            state.catalogDisplayed = true;
        },
        setCatalogPagesList: (state: IStateInterface, catalogPages: CatalogPage[]) => {
            state.catalogPages = catalogPages;
        },
        setActualCatalogPage: (state: IStateInterface, catalogPageCaption: string) => {
            if (state.catalogPages !== null) {
                const catalogPageFinded = state.catalogPages.find((catalogPage) => catalogPage.caption === catalogPageCaption);

                if (catalogPageFinded !== undefined) {
                    state.actualCatalogPage = catalogPageFinded;
                }
            }
        },
        setCatalogPageItems: (state, catalogPageItems: CatalogPageItems) => {
            state.catalogPagesItems.set(catalogPageItems.id, catalogPageItems);
            state.actualPage = catalogPageItems;
            state.actualCatalogItem = false;
            state.actualCatalogItemQuantity = 1;
            state.actualItemIndex = -1;
        },
        setActualItemIndex: (state: IStateInterface, index: number) => {
            state.actualItemIndex = index;
        },
        setActualItem: (state: IStateInterface, catalogItemId: number) => {
            if (state.actualPage) {
                const catalogItemFinded = state.actualPage.catalogItems.find((catalogItem) => catalogItem.id === catalogItemId);

                if (catalogItemFinded !== undefined) {
                    state.actualCatalogItem = catalogItemFinded;
                    state.actualCatalogItemQuantity = 1;
                }
            }
        },
        increaseActualCatalogItemQuantity: (state: IStateInterface) => {
            if (state.actualCatalogItemQuantity < 100) {
                state.actualCatalogItemQuantity++;
            }
        },
        decreaseActualCatalogItemQuantity: (state: IStateInterface) => {
            if (state.actualCatalogItemQuantity > 1) {
                state.actualCatalogItemQuantity--;
            }
        },
        setActualItemQuantity: (state: IStateInterface, quantity: number) => {
            state.actualCatalogItemQuantity = quantity;
        },
        setSecondLevelCategories: (state: IStateInterface, pages) => {
            state.catalogSecondCategoriesPages = pages;
        },
        setActualCatalogCaption: (state: IStateInterface, caption: string) => {
            state.actualCatalogCaption = caption;
        },
        setChangeEvent: (state: IStateInterface, changeEvent: 'clicked' | 'not-clicked') => {
            state.changeEvent = changeEvent;
        },
        displayBuyConfirmation: (state: IStateInterface, displayed: boolean) => {
            state.buyConfirmationDisplayed = displayed;
        },
        displayGiftSender: (state: IStateInterface, displayed: boolean) => {
            state.sendGiftDisplayed = displayed;
        },
        resetGiftDataAndHide: (state: IStateInterface) => {
            state.sendGiftDisplayed = false;
            state.giftContent = '';
            state.friendName = '';
        },
    },
    actions: {
        sendGift: ({ state, getters, dispatch, commit }) => {
            if (state.actualPage && getters.actualItem && state.friendName !== '') {
                dispatch('bridge/buildAndSendGift', {
                    pageId: state.actualPage.id,
                    itemId: getters.actualItem.id,
                    giftContent: state.giftContent,
                    username: state.friendName,
                }, { root: true });

                commit('resetGiftDataAndHide');
            }
        },
        setGiftConfiguration: ({ state, commit }, config: GiftWrappingConfiguration) => {
            state.giftWrappingConfiguration = config;
            state.currentBoxType = config.stuffTypes[0];
        },
        getGiftConfiguration: ({ commit }) => {
            commit('network/composePacket', new GetGiftWrappingConfigurationComposer(), { root: true });
        },
        insertCatalogPages: ({ state, commit }, catalogPages: CatalogPage[]) => {
            commit('setCatalogPagesList', catalogPages);

            if (catalogPages[0].catalogPages) {
                commit('setSecondLevelCategories', catalogPages[0].catalogPages);
            }
        },
        itemsRequest: ({ state, commit }, pageId: number) => {
            const catalogPageItems = state.catalogPagesItems.get(pageId);

            if (catalogPageItems !== undefined) {
                state.actualPage = catalogPageItems;
            } else {
                commit('network/composePacket', new CatalogPageRequestComposer(pageId), { root: true });
            }
        },
        buyItem: ({ state, getters, dispatch }) => {
            if (state.actualPage && getters.actualItem && state.actualCatalogItemQuantity > 0) {
                dispatch('bridge/buyItemFromCatalog', {
                    pageId: state.actualPage.id,
                    item: getters.actualItem,
                    quantity: state.actualCatalogItemQuantity,
                }, { root: true });
            }
        },
    },
};

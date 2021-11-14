import { Module } from 'vuex';
import { Core } from '../../../../core/Core';
import { InventoryItem } from '../../../../core/logic/inventory/InventoryItem';
import { InventoryItemCollection } from '../../../../core/logic/inventory/InventoryItemCollection';
import { CatalogItem } from '../../../../core/logic/catalog/items/CatalogItem';

let core: Core;

export const BridgeStore: Module<{}, any> = {
    namespaced: true,
    mutations: {
        plugCore: (state, payload: Core) => {
            core = payload;
        },
    },
    actions: {
        initCore: (injectee, sso: string) => {
            core.init(sso);
        },
        startPlacingFurni: ({ state, commit }, inventoryItem: InventoryItem) => {
            core.gameManager.roomManager.floorItemPlacer.placingFurniFromInventory = true;
            core.gameManager.roomManager.floorItemPlacer.startFurniPlacing(inventoryItem.virtualId);
        },
        interactionFurni: (injectee, payload: 'rotate' | 'pickup' | 'use' | 'move') => {
            if (payload === 'rotate') {
                core.player.playerInteraction.rotate();
            } else if (payload === 'pickup') {
                core.player.playerInteraction.pickUp();
            } else if (payload === 'use') {
                core.player.playerInteraction.useIt();
            } else if (payload === 'move') {
                core.player.playerInteraction.move();
            }
        },
        ENTER_ROOM: (context, roomId: number) => {
            core.player.navigateToRoom(roomId);
        },
        navigatorSearchRequest: (injectee, { category, query }) => {
            if (core.player !== undefined) {
                core.player.navigatorQuery(category, query);
            }
        },
        loadItemFurniData: ({ commit }, inventoryItem: InventoryItem | InventoryItemCollection) => core.player.playerInventory.resolveItemFurniData(inventoryItem),
        sendMessage: (injectee, args: { message: string, bubble: number }) => {
            core.gameManager.chatManager.sendMessage(args.message, args.bubble);
        },
        buildAndSendGift: (injectee, payload: { pageId: number, itemId: number, username: string, giftContent: string }) => {
            core.gameManager.catalogManager.giftManager.buildAndSendGift(
                payload.pageId,
                payload.itemId,
                payload.giftContent,
                payload.username,
            );
        },
        buyItemFromCatalog: (injectee, payload: { pageId: number, item: CatalogItem, quantity: number }) => {
            core.gameManager.catalogManager.buyItem(payload.pageId, payload.item, payload.quantity);
        },
        loadGroupFromProfile: (injectee, groupId: number) => {
            core.gameManager.profileManager.loadGroup(groupId);
        },
        setProfileDisplayed: (injectee, displayed: boolean) => {
            core.gameManager.profileManager.displayProfileInStore(displayed);
        },
    },
};

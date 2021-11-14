import { GiftWrappingManager } from './data/GiftWrappingManager';
import { Core } from '../../Core';
import { GiftManager } from './GiftManager';
import { CatalogItem } from './items/CatalogItem';
import { CatalogBuyItemComposer } from '../../network/packets/outgoing/catalog/CatalogBuyItemComposer';
import { PlayerCurrencies } from '../client/PlayerCurrencies';

export class CatalogManager {
    public giftWrappingManager: GiftWrappingManager;
    public giftManager: GiftManager;

    constructor(public core: Core) {
        this.giftWrappingManager = new GiftWrappingManager(core);
        this.giftManager = new GiftManager(core);
    }

    public buyItem(pageId: number, item: CatalogItem, quantity: number): void {
        const playerCurrencies: PlayerCurrencies = this.core.player.playerCurrencies;
        let canBuy = true;
        let notifError = '';

        if (item.credits && item.creditCost > playerCurrencies.credits) {
            notifError = `Il te manque ${item.creditCost - playerCurrencies.credits} crédits pour faire ceci.`;
            canBuy = false;
        }

        if (item.diamonds && item.diamondCost > playerCurrencies.diamonds) {
            notifError = `Il te manque ${item.diamondCost - playerCurrencies.diamonds} diamants pour faire ceci.`;
            canBuy = false;
        }

        if (item.seasonal && item.seasonalCost > playerCurrencies.duckets) {
            notifError = `Il te manque ${item.seasonalCost - playerCurrencies.duckets} duckets pour faire ceci.`;
            canBuy = false;
        }

        if (canBuy) {
            this.core.network.socketClient.processOutgoing(new CatalogBuyItemComposer(pageId, item.id, '', quantity));
        } else {
            this.core.gameManager.notificationManager.sendNotification('Erreur', notifError);
        }
    }
}

import { Core } from '../../Core';
import { PurchaseGiftComposer } from '../../network/packets/outgoing/catalog/PurchaseGiftComposer';

export class GiftManager {
    constructor(public core: Core) {}

    public buildAndSendGift(pageId: number, itemId: number, giftMessage: string, username: string): void {
        const giftExtraData = this.buildGiftExtraData(giftMessage);
        const giftWrappingConfig = this.core.gameManager.catalogManager.giftWrappingManager.configuration;

        const composer = new PurchaseGiftComposer(
            pageId,
            itemId,
            giftExtraData,
            username,
            giftMessage,
            giftWrappingConfig.stuffTypes[0],
            giftWrappingConfig.stuffTypes[0],
            giftWrappingConfig.ribbonTypes[0],
            true,
        );

        this.core.network.socketClient.processOutgoing(composer);
    }

    public buildGiftExtraData(message: string): string {
        const datas: string[] = [];

        datas.push('GIFT::##');
        datas.push('EXTRA_PARAM');
        datas.push('');
        datas.push('MESSAGE');
        datas.push(message);
        datas.push('PURCHASER_NAME');
        datas.push(this.core.player.playerData.username);
        datas.push('PURCHASER_FIGURE');
        datas.push(this.core.player.playerData.figure);
        datas.push('PRODUCT_CODE');
        datas.push('');
        datas.push('state');
        datas.push('0');

        // eslint-disable-next-line prefer-numeric-literals
        return datas.join(String.fromCharCode(parseInt('0x01', 16)));
    }
}

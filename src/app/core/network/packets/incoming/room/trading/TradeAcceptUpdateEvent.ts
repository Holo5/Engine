import { Incoming } from '../../Incoming';

export class TradeAcceptUpdateEvent extends Incoming {
    process(): void {
        const userId = this.packet.readInt();
        const accepted = this.packet.readInt();

        this.core.gameManager.roomManager.tradeManager.updateLockedState(userId, accepted === 1);
    }
}

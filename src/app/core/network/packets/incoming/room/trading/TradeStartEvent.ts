import { Incoming } from '../../Incoming';

export class TradeStartEvent extends Incoming {
    public process() {
        const senderId = this.packet.readInt();
        const unknown1 = this.packet.readInt();
        const receiverId = this.packet.readInt();
        const unknown2 = this.packet.readInt();

        this.core.gameManager.roomManager.tradeManager.start(receiverId, senderId);
    }
}

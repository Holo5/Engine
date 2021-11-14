import { Incoming } from '../../Incoming';

export class TradeCloseEvent extends Incoming {
    public process() {
        const userId = this.packet.readInt();
        const unknown1 = this.packet.readInt();

        this.core.gameManager.roomManager.tradeManager.close();
    }
}

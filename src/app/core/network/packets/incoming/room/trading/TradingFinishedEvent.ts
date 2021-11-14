import { Incoming } from '../../Incoming';

export class TradingFinishedEvent extends Incoming {
    process(): void {
        this.core.gameManager.roomManager.tradeManager.close();
    }
}

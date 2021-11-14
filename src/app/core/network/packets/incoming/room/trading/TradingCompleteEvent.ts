import { Incoming } from '../../Incoming';

export class TradingCompleteEvent extends Incoming {
    process(): void {
        this.core.gameManager.roomManager.tradeManager.startCountdown();
    }
}

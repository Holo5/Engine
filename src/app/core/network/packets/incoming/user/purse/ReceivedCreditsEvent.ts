import { Incoming } from '../../Incoming';

export class ReceivedCreditsEvent extends Incoming {
    process(): void {
        const credits = this.packet.readString();

        this.core.player.playerCurrencies.credits = parseInt(credits);
    }
}

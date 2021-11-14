import { Incoming } from '../../Incoming';

export class CurrenciesEvent extends Incoming {
    process(): void {
        const currenciesSize = this.packet.readInt();

        for (let i = 0; i < currenciesSize; i++) {
            const key = this.packet.readInt();
            const value = this.packet.readInt();

            if (key === 0) {
                this.core.player.playerCurrencies.duckets = value;
            }

            if (key === 5) {
                this.core.player.playerCurrencies.diamonds = value;
            }

            if (key === 101) {
                this.core.player.playerCurrencies.seasonals = value;
            }
        }
    }
}

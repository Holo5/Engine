import { Incoming } from '../../Incoming';

export class TradingErrorEvent extends Incoming {
    process(): void {
        const errorCode = this.packet.readInt();
        const extras = this.packet.readString();

        // 4 = récupérer le pseudo ?
        // 6 = impossible de trader
        // 7 = jsp
        // 8 = jsp mais on récup un pseudo

        console.log('-----------------------------------');
        console.log(errorCode, extras);
    }
}

import { OutgoingPacket } from '../../OutgoingPacket';
import { Outgoing } from '../../Outgoing';
import { OutgoingHeader } from '../../OutgoingHeader';

export class TradingOfferItemComposer extends Outgoing {
    private readonly _virtualId: number;

    constructor(virtualId: number) {
        super(OutgoingHeader.TRADING_OFFER_ITEM_MESSAGE);

        this._virtualId = virtualId;
    }

    compose(): OutgoingPacket {
        this.packet.writeInt(this._virtualId);

        return this.packet.prepare();
    }
}

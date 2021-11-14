import { Outgoing } from '../../Outgoing';
import { OutgoingHeader } from '../../OutgoingHeader';
import { OutgoingPacket } from '../../OutgoingPacket';

export class TradingOfferItemsComposer extends Outgoing {
    private readonly _virtualId: number;
    private readonly _amount: number;

    constructor(virtualId: number, amount: number) {
        super(OutgoingHeader.TRADING_OFFER_ITEMS_MESSAGE);

        this._virtualId = virtualId;
        this._amount = amount;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._amount);
        this.packet.writeInt(this._virtualId);

        return this.packet.prepare();
    }
}

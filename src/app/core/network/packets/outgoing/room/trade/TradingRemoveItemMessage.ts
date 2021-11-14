import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class TradingRemoveItemMessage extends Outgoing {
    private readonly _virtualId: number;

    constructor(virtualId: number) {
        super(OutgoingHeader.TRADING_REMOVE_ITEM_MESSAGE);

        this._virtualId = virtualId;
    }

    compose(): OutgoingPacket {
        this.packet.writeInt(this._virtualId);

        return this.packet.prepare();
    }
}

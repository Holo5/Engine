import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class TradingCancelComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.TRADING_CANCEL_MESSAGE);
    }

    compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

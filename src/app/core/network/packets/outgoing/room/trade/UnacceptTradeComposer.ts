import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class UnacceptTradeComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.TRADING_MODIFY_MESSAGE);
    }

    compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

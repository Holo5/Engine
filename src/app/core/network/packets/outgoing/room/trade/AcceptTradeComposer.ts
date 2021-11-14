import { Outgoing } from '../../Outgoing';
import { OutgoingHeader } from '../../OutgoingHeader';
import { OutgoingPacket } from '../../OutgoingPacket';

export class AcceptTradeComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.TRADING_ACCEPT_MESSAGE);
    }

    compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

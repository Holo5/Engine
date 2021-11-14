import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class TradingConfirmComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.TRADING_CONFIRM_MESSAGE);
    }

    compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

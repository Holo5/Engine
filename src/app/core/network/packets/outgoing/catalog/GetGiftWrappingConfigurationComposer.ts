import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class GetGiftWrappingConfigurationComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.GET_GIFT_WRAPPING_CONFIGURATION_MESSAGE);
    }

    compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

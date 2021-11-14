import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class ClubStatusComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.SCR_GET_USER_INFO_MESSAGE);
    }

    compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

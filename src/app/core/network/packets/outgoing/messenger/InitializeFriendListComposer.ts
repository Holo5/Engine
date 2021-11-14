import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class InitializeFriendListComposer extends Outgoing {
    public constructor() {
        super(OutgoingHeader.MESSENGER_INIT_MESSAGE);
    }

    public compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

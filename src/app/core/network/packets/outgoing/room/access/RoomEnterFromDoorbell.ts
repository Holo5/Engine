import { Outgoing } from '../../Outgoing';
import { OutgoingHeader } from '../../OutgoingHeader';
import { OutgoingPacket } from '../../OutgoingPacket';

export class RoomEnterFromDoorbell extends Outgoing {
    constructor() {
        super(OutgoingHeader.GO_TO_FLAT_MESSAGE);
    }

    public compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class RoomModelComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.GET_ROOM_ENTRY_DATA_MESSAGE);
    }

    public compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

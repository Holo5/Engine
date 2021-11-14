import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class DeleteRoomComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.DELETE_ROOM_MESSAGE);
    }

    public compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

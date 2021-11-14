import { Outgoing } from '../Outgoing';
import { OutgoingHeader } from '../OutgoingHeader';
import { OutgoingPacket } from '../OutgoingPacket';

export class RoomDataRequestComposer extends Outgoing {
    private roomId: number;

    constructor(roomId: number) {
        super(OutgoingHeader.GET_GUEST_ROOM_MESSAGE);

        this.roomId = roomId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this.roomId);
        this.packet.writeInt(0);
        this.packet.writeInt(0);

        return this.packet.prepare();
    }
}

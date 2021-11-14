import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class CanCreateRoomComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.CAN_CREATE_ROOM_MESSAGE);
    }

    compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

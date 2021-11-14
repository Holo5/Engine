import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class GetBannedUsersComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.GET_ROOM_BANNED_USERS_MESSAGE);
    }

    public compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

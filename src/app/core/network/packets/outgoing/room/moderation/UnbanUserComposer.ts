import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class UnbanUserComposer extends Outgoing {
    private _userId: number;

    constructor(userId: number) {
        super(OutgoingHeader.UNBAN_USER_FROM_ROOM_MESSAGE);

        this._userId = userId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._userId);

        return this.packet.prepare();
    }
}

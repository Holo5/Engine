import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class UsersWithRightsComposer extends Outgoing {
    private _roomId: number;

    constructor(roomId: number) {
        super(OutgoingHeader.GET_ROOM_RIGHTS_MESSAGE);

        this._roomId = roomId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._roomId);

        return this.packet.prepare();
    }
}

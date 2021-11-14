import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class RoomEnterComposer extends Outgoing {
    private _roomId: number;
    private _password: string;

    constructor(roomId: number, password: string = '') {
        super(OutgoingHeader.OPEN_FLAT_CONNECTION_MESSAGE);

        this._roomId = roomId;
        this._password = password;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._roomId).writeString(this._password);

        return this.packet.prepare();
    }
}

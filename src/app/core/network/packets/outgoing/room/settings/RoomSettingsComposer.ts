import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class RoomSettingsComposer extends Outgoing {
    private _roomId: number;

    constructor(roomId: number) {
        super(OutgoingHeader.GET_ROOM_SETTINGS_MESSAGE);

        this._roomId = roomId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._roomId);

        return this.packet.prepare();
    }
}

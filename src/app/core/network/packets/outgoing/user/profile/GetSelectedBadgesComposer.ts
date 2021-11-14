import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class GetSelectedBadgesComposer extends Outgoing {
    private _userId: number;

    constructor(userId: number) {
        super(OutgoingHeader.GET_SELECTED_BADGES_MESSAGE);

        this._userId = userId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._userId);

        return this.packet.prepare();
    }
}

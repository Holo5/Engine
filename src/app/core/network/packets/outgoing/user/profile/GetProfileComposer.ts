import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class GetProfileComposer extends Outgoing {
    private _userId: number;

    constructor(userId: number) {
        super(OutgoingHeader.GET_EXTENDED_PROFILE_MESSAGE);

        this._userId = userId;
    }

    compose(): OutgoingPacket {
        this.packet.writeInt(this._userId);

        return this.packet.prepare();
    }
}

import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class RemoveRightsComposer extends Outgoing {
    private _count: number;
    private _userId: number;

    constructor(userId: number) {
        super(OutgoingHeader.REMOVE_RIGHTS_MESSAGE);

        this._count = 1;
        this._userId = userId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._count);
        this.packet.writeInt(this._userId);

        return this.packet.prepare();
    }
}

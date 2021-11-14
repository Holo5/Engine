import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class DeclineFriendshipComposer extends Outgoing {
    private readonly _allRequests: boolean;
    private readonly _mode: number;
    private readonly _userId: number;

    public constructor(arg: number | boolean) {
        super(OutgoingHeader.DECLINE_BUDDY_MESSAGE);

        this._allRequests = typeof arg === 'boolean';
        this._userId = typeof arg === 'number' ? arg : 0;
        this._mode = 0;
    }

    public compose(): OutgoingPacket {
        this.packet.writeBoolean(this._allRequests);
        this.packet.writeInt(this._mode);
        this.packet.writeInt(this._userId);

        return this.packet.prepare();
    }
}

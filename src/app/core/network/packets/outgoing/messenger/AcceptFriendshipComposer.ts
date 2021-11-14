import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class AcceptFriendshipComposer extends Outgoing {
    private readonly _usersId: number[];

    public constructor(usersId: number[]) {
        super(OutgoingHeader.ACCEPT_BUDDY_MESSAGE);

        this._usersId = usersId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._usersId.length);

        for (let i = 0; i < this._usersId.length; i++) {
            this.packet.writeInt(this._usersId[i]);
        }

        return this.packet.prepare();
    }
}

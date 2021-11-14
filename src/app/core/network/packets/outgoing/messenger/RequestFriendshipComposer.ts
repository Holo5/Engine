import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class RequestFriendshipComposer extends Outgoing {
    private readonly _username: string;

    public constructor(username: string) {
        super(OutgoingHeader.REQUEST_BUDDY_MESSAGE);

        this._username = username;
    }

    public compose(): OutgoingPacket {
        this.packet.writeString(this._username);

        return this.packet.prepare();
    }
}

import { Outgoing } from '../Outgoing';
import { OutgoingHeader } from '../OutgoingHeader';
import { OutgoingPacket } from '../OutgoingPacket';

export class FollowFriendComposer extends Outgoing {
    private readonly _friendId: number;

    public constructor(friendId: number) {
        super(OutgoingHeader.FOLLOW_FRIEND_MESSAGE);

        this._friendId = friendId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._friendId);

        return this.packet.prepare();
    }
}

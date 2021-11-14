import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';
import { Friend } from '../../../../logic/console/Friend';

export class InviteFriendComposer extends Outgoing {
    private readonly _message: string;
    private readonly _friendsSize: number;
    private readonly _friends: Friend[];

    public constructor(friends: Friend[], message: string) {
        super(OutgoingHeader.SEND_ROOM_INVITE_MESSAGE);

        this._message = message;
        this._friendsSize = friends.length;
        this._friends = friends;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._friendsSize);
        this.composeFriendsIds();
        this.packet.writeString(this._message);

        return this.packet.prepare();
    }

    private composeFriendsIds(): void {
        for (let i = 0; i < this._friendsSize; i++) {
            const friendId = this._friends[i].id;

            this.packet.writeInt(friendId);
        }
    }
}

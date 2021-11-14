import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class LetUserInComposer extends Outgoing {
    private _username: string;
    private _answered: boolean;

    constructor(username: string, answered: boolean) {
        super(OutgoingHeader.LET_USER_IN_MESSAGE);

        this._username = username;
        this._answered = answered;
    }

    public compose(): OutgoingPacket {
        this.packet.writeString(this._username).writeBoolean(this._answered);

        return this.packet.prepare();
    }
}

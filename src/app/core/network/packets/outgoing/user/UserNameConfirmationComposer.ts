import { OutgoingPacket } from '../OutgoingPacket';
import { Outgoing } from '../Outgoing';
import { OutgoingHeader } from '../OutgoingHeader';

export class UserNameConfirmationComposer extends Outgoing {
    private _username: string;

    constructor(username: string) {
        super(OutgoingHeader.CONFIRM_USERNAME_MESSAGE);

        this._username = username;
    }

    public compose(): OutgoingPacket {
        this.packet.writeString(this._username);

        return this.packet.prepare();
    }
}

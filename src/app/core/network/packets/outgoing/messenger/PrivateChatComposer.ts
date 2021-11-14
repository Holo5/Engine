import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class PrivateChatComposer extends Outgoing {
    private readonly _userId: number;
    private readonly _message: string;

    public constructor(userId: number, message: string) {
        super(OutgoingHeader.SEND_MSG_MESSAGE);

        this._userId = userId;
        this._message = message;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._userId);
        this.packet.writeString(this._message);

        return this.packet.prepare();
    }
}

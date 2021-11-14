import { Outgoing } from '../../Outgoing';
import { OutgoingHeader } from '../../OutgoingHeader';
import { OutgoingPacket } from '../../OutgoingPacket';

export class ChatMessageComposer extends Outgoing {
    private _message: string;
    private _bubble: number;

    constructor(message: string, bubble: number) {
        super(OutgoingHeader.CHAT_MESSAGE);

        this._message = message;
        this._bubble = bubble;
    }

    public compose(): OutgoingPacket {
        this.packet.writeString(this._message);
        this.packet.writeInt(this._bubble);

        return this.packet.prepare();
    }
}

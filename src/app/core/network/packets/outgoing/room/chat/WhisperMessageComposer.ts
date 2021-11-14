import { Outgoing } from '../../Outgoing';
import { OutgoingHeader } from '../../OutgoingHeader';
import { OutgoingPacket } from '../../OutgoingPacket';

export class WhisperMessageComposer extends Outgoing {
    private _message: string;

    constructor(message: string) {
        super(OutgoingHeader.WHISPER_MESSAGE);

        this._message = message;
    }

    public compose(): OutgoingPacket {
        this.packet.writeString(this._message);

        return this.packet.prepare();
    }
}

import { Outgoing } from '../Outgoing';
import { OutgoingHeader } from '../OutgoingHeader';
import { OutgoingPacket } from '../OutgoingPacket';

export class CheckReleaseMessageComposer extends Outgoing {
    private _release: string;

    constructor() {
        super(OutgoingHeader.GET_CLIENT_VERSION_MESSAGE);

        this._release = 'PRODUCTION-201709192204-203982672';
    }

    compose(): OutgoingPacket {
        this.packet.writeString(this._release);

        return this.packet.prepare();
    }
}

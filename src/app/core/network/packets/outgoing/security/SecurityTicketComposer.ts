import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class SecurityTicketComposer extends Outgoing {
    private readonly _ssoTicket: string;

    constructor(ssoTicket: string) {
        super(OutgoingHeader.SSOTICKET_MESSAGE);

        this._ssoTicket = ssoTicket;
    }

    public compose(): OutgoingPacket {
        if (this._ssoTicket) {
            this.packet.writeString(this._ssoTicket);
        }

        return this.packet.prepare();
    }
}

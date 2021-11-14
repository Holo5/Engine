import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class UserItemsComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.REQUEST_FURNI_INVENTORY_MESSAGE);
    }

    public compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class RoomCategoriesComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.GET_USER_FLAT_CATS_MESSAGE);
    }

    public compose(): OutgoingPacket {
        return this.packet.prepare();
    }
}

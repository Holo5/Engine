import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class RoomCreateComposer extends Outgoing {
    constructor() {
        super(OutgoingHeader.UNKNOWN);
    }

    public compose(): OutgoingPacket {
        this.packet.writeString('Home :D')
            .writeString('On est bien là non ? :D')
            .writeString('model_o')
            .writeInt(1)
            .writeInt(50)
            .writeInt(1);

        return this.packet.prepare();
    }
}

import { Outgoing } from '../Outgoing';
import { OutgoingHeader } from '../OutgoingHeader';
import { OutgoingPacket } from '../OutgoingPacket';

export class CatalogPageRequestComposer extends Outgoing {
    private id: number;

    constructor(id: number) {
        super(OutgoingHeader.GET_CATALOG_PAGE_MESSAGE);

        this.id = id;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this.id);
        return this.packet.prepare();
    }
}

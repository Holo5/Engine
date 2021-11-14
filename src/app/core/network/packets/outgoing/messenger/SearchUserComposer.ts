import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class SearchUserComposer extends Outgoing {
    private readonly _query: string;

    public constructor(query: string) {
        super(OutgoingHeader.HABBO_SEARCH_MESSAGE);

        this._query = query;
    }

    public compose(): OutgoingPacket {
        this.packet.writeString(this._query);

        return this.packet.prepare();
    }
}

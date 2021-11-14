import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class NavigatorSearchComposer extends Outgoing {
    private _tab: string;
    private _query: string;

    public constructor(tab: string, query: string) {
        super(OutgoingHeader.NAVIGATOR_SEARCH_MESSAGE);

        this._tab = tab;
        this._query = query;
    }

    public compose(): OutgoingPacket {
        this.packet.writeString(this._tab)
            .writeString(this._query);

        return this.packet.prepare();
    }
}

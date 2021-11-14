import { Outgoing } from '../../Outgoing';
import { OutgoingHeader } from '../../OutgoingHeader';
import { OutgoingPacket } from '../../OutgoingPacket';

export class ChangeItemStateComposer extends Outgoing {
    private _requestData: number;
    private _itemId: number;

    constructor(requestData: number, itemId: number) {
        super(OutgoingHeader.USE_FURNITURE_MESSAGE);

        this._requestData = requestData;
        this._itemId = itemId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._itemId).writeInt(this._requestData);

        return this.packet.prepare();
    }
}

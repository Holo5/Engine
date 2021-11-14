import { Outgoing } from '../../Outgoing';
import { OutgoingHeader } from '../../OutgoingHeader';
import { OutgoingPacket } from '../../OutgoingPacket';

export class PickupItemComposer extends Outgoing {
    private _itemType: number;
    private _itemId: number;

    constructor(itemType: number, itemId: number) {
        super(OutgoingHeader.PICKUP_OBJECT_MESSAGE);

        this._itemType = itemType;
        this._itemId = itemId;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._itemType).writeInt(this._itemId);

        return this.packet.prepare();
    }
}

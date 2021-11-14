import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class OpenGiftComposer extends Outgoing {
    private readonly _itemId: number;

    constructor(
        itemId: number,
    ) {
        super(OutgoingHeader.OPEN_GIFT_MESSAGE);

        this._itemId = itemId;
    }

    compose(): OutgoingPacket {
        this.packet.writeInt(this._itemId);

        return this.packet.prepare();
    }
}

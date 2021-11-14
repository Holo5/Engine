import { OutgoingHeader } from '../OutgoingHeader';
import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';

export class CatalogBuyItemComposer extends Outgoing {
    private readonly _pageId: number;
    private readonly _itemId: number;
    private readonly _data: string;
    private readonly _amount: number;

    constructor(pageId: number, itemId: number, data: string, amount: number) {
        super(OutgoingHeader.PURCHASE_FROM_CATALOG_MESSAGE);

        this._pageId = pageId;
        this._itemId = itemId;
        this._data = data;
        this._amount = amount;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._pageId);
        this.packet.writeInt(this._itemId);
        this.packet.writeString(this._data);
        this.packet.writeInt(this._amount);

        return this.packet.prepare();
    }
}

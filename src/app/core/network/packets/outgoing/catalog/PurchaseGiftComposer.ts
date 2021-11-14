import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class PurchaseGiftComposer extends Outgoing {
    private readonly _pageId: number;
    private readonly _itemId: number;
    private readonly _extraData: string;
    private readonly _sendingUser: string;
    private readonly _message: string;
    private readonly _spriteId: number;
    private readonly _wrappingPaper: number;
    private readonly _decorationType: number;
    private readonly _showUsername: boolean;

    constructor(
        pageId: number,
        itemId: number,
        extraData: string,
        sendingUser: string,
        message: string,
        spriteId: number,
        wrappingPaper: number,
        decorationType: number,
        showUsername: boolean,
    ) {
        super(OutgoingHeader.PURCHASE_FROM_CATALOG_AS_GIFT_MESSAGE);

        this._pageId = pageId;
        this._itemId = itemId;
        this._extraData = extraData;
        this._sendingUser = sendingUser;
        this._message = message;
        this._spriteId = spriteId;
        this._wrappingPaper = wrappingPaper;
        this._decorationType = decorationType;
        this._showUsername = showUsername;
    }

    compose(): OutgoingPacket {
        this.packet.writeInt(this._pageId);
        this.packet.writeInt(this._itemId);
        this.packet.writeString(this._extraData);
        this.packet.writeString(this._sendingUser);
        this.packet.writeString(this._message);
        this.packet.writeInt(this._spriteId);
        this.packet.writeInt(this._wrappingPaper);
        this.packet.writeInt(this._decorationType);
        this.packet.writeBoolean(this._showUsername);

        return this.packet.prepare();
    }
}

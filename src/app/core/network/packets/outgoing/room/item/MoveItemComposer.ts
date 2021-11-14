import { OutgoingHeader } from '../../OutgoingHeader';
import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';

export class MoveItemComposer extends Outgoing {
    private _itemId: number;
    private _mapX: number;
    private _mapY: number;
    private _direction: number;

    constructor(itemId: number, mapX: number, mapY: number, direction: number) {
        super(OutgoingHeader.MOVE_OBJECT_MESSAGE);

        this._itemId = itemId;
        this._mapX = mapX;
        this._mapY = mapY;
        this._direction = direction;
    }

    public compose(): OutgoingPacket {
        this.packet
            .writeInt(this._itemId)
            .writeInt(this._mapX)
            .writeInt(this._mapY)
            .writeInt(this._direction);

        return this.packet.prepare();
    }
}

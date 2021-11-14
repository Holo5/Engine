import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class FloorItemPlacingComposer extends Outgoing {
    private _itemId: number;
    private _mapX: number;
    private _mapY: number;
    private _direction: number;

    constructor(itemId: number, mapX: number, mapY: number, direction: number) {
        super(OutgoingHeader.PLACE_OBJECT_MESSAGE);
        this._itemId = itemId;
        this._mapX = mapX;
        this._mapY = mapY;
        this._direction = direction;
    }

    public compose(): OutgoingPacket {
        this.packet.writeString(`${this._itemId} ${this._mapX} ${this._mapY} ${this._direction}`);

        return this.packet.prepare();
    }
}

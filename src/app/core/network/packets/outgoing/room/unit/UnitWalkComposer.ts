import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class UnitWalkComposer extends Outgoing {
    private _mapX: number;
    private _mapY: number;

    constructor(mapX: number, mapY: number) {
        super(OutgoingHeader.MOVE_AVATAR_MESSAGE);
        this._mapX = mapX;
        this._mapY = mapY;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._mapX).writeInt(this._mapY);

        return this.packet.prepare();
    }
}

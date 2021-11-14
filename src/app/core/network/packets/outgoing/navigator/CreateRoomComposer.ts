import { Outgoing } from '../Outgoing';
import { OutgoingPacket } from '../OutgoingPacket';
import { OutgoingHeader } from '../OutgoingHeader';

export class CreateRoomComposer extends Outgoing {
    private _name: string;
    private _description: string;
    private _model: string;
    private _category: number;
    private _maxUsers: number;
    private _tradeState: number;

    constructor(
        name: string,
        description: string,
        model: string,
        category: number,
        maxUsers: number,
        tradeState: number,
    ) {
        super(OutgoingHeader.CREATE_FLAT_MESSAGE);

        this._name = name;
        this._description = description;
        this._model = model;
        this._category = category;
        this._maxUsers = maxUsers;
        this._tradeState = tradeState;
    }

    compose(): OutgoingPacket {
        this.packet.writeString(this._name);
        this.packet.writeString(this._description);
        this.packet.writeString(this._model);
        this.packet.writeInt(this._category);
        this.packet.writeInt(this._maxUsers);
        this.packet.writeInt(this._tradeState);

        return this.packet.prepare();
    }
}

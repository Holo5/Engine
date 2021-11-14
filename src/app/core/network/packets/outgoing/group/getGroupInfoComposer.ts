import { Outgoing } from '../Outgoing';
import { OutgoingHeader } from '../OutgoingHeader';
import { OutgoingPacket } from '../OutgoingPacket';

export class GetGroupInfoComposer extends Outgoing {
    private _groupId: number;

    constructor(groupId: number) {
        super(OutgoingHeader.GET_GROUP_INFO_MESSAGE);

        this._groupId = groupId;
    }

    compose(): OutgoingPacket {
        this.packet.writeInt(this._groupId);
        this.packet.writeBoolean(true);

        return this.packet.prepare();
    }
}

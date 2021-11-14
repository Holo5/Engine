import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';
import { ERelationshipLevel } from '../../../../../logic/profile/interfaces/ERelationshipLevel';

export class SetRelationshipComposer extends Outgoing {
    private _userId: number;
    private _relationshipLevel: ERelationshipLevel;

    constructor(userId: number, relationshipLevel: ERelationshipLevel) {
        super(OutgoingHeader.SET_RELATIONSHIP_MESSAGE);

        this._userId = userId;
        this._relationshipLevel = relationshipLevel;
    }

    compose(): OutgoingPacket {
        this.packet.writeInt(this._userId);
        this.packet.writeInt(this._relationshipLevel);

        return this.packet.prepare();
    }
}

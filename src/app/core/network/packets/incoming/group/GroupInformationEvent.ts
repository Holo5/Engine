import { Incoming } from '../Incoming';
import { Group } from '../../../../logic/group/Group';

export class GroupInformationEvent extends Incoming {
    public process(): void {
        const id = this.packet.readInt();
        const isVisible = this.packet.readBoolean();
        const typeId = this.packet.readInt();
        const title = this.packet.readString();
        const description = this.packet.readString();
        const badge = this.packet.readString();
        const roomId = this.packet.readInt();
        const roomName = this.packet.readString();
        const membership = this.packet.readInt();
        const membersSize = this.packet.readInt();
        const unknownBoolean = this.packet.readBoolean();
        const createdAt = this.packet.readString();
        const isOwner = this.packet.readBoolean();
        const isAdmin = this.packet.readBoolean();

        const ownerId = this.packet.readInt();

        const flag = this.packet.readBoolean();
        const canMemberDecorate = this.packet.readBoolean();

        const membershipRequestsSize = this.packet.readInt();
        const hasForum = this.packet.readBoolean();

        const group = new Group(
            id,
            title,
            isVisible,
            typeId,
            description,
            badge,
            roomId,
            roomName,
            membership,
            membersSize,
            createdAt,
            isOwner,
            isAdmin,
            ownerId,
            canMemberDecorate,
            membershipRequestsSize,
            hasForum,
        );

        this.core.gameManager.profileManager.setGroup(group);
    }
}

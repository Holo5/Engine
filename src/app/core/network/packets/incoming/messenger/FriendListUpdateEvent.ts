import { Incoming } from '../Incoming';
import { Friend } from '../../../../logic/console/Friend';
import { ERelationshipLevel } from '../../../../logic/profile/interfaces/ERelationshipLevel';

export class FriendListUpdateEvent extends Incoming {
    private id: number;

    public process(): void {
        const unknown1 = this.packet.readInt(); // ??
        const unknown2 = this.packet.readInt(); // ??
        const action = this.packet.readInt();

        if (action === -1) {
            this.removedFromFriendsList();
        } else {
            this.id = this.packet.readInt();

            if (Math.sign(this.id) === -1) {
                this.addGroup();
            } else {
                this.addFriend();
            }
        }
    }

    private removedFromFriendsList(): void {
        const oldFriendId = this.packet.readInt();

        if (this.core.gameManager.consoleManager.chatManager.discussionExist(oldFriendId)) {
            this.core.gameManager.consoleManager.chatManager.notFriend(oldFriendId);
        }

        this.core.gameManager.consoleManager.removeFriend(oldFriendId);
    }

    private addGroup(): void {
        const groupTitle = this.packet.readString();
        const unknown3 = this.packet.readInt(); // ??
        const isOnline = this.packet.readBoolean();
        const useless1 = this.packet.readBoolean();
        const badge = this.packet.readString();

        // ... useless packets

        // TODO: get group
    }

    private addFriend(): void {
        const username = this.packet.readString();
        const unknown3 = this.packet.readInt(); // ??
        const isOnline = this.packet.readBoolean();
        const isInRoom = this.packet.readBoolean();
        const figure = this.packet.readString();
        const unknown4 = this.packet.readInt(); // ??
        const motto = this.packet.readString();
        const unknown5 = this.packet.readString(); // ??
        const unknown6 = this.packet.readString(); // ??
        const unknown7 = this.packet.readBoolean(); // ??
        const unknown8 = this.packet.readBoolean(); // ??
        const unknown9 = this.packet.readBoolean(); // ??
        const relationshipLevelShort = this.packet.readShort();
        const relationshipLevel = relationshipLevelShort === 1 ? ERelationshipLevel.HEART : relationshipLevelShort === 2 ? ERelationshipLevel.SMILE : relationshipLevelShort === 3 ? ERelationshipLevel.BOBBA : ERelationshipLevel.EMPTY;

        const friend = new Friend(
            this.id,
            username,
            isOnline,
            isInRoom,
            figure,
            motto,
            relationshipLevel,
        );

        if (this.core.gameManager.consoleManager.isMyFriend(friend.id)) {
            if (this.core.gameManager.consoleManager.chatManager.discussionExist(friend.id)) {
                const friendStatus = this.core.gameManager.consoleManager.getFriendStatusById(friend.id);

                if (friendStatus.isOnline !== friend.isOnline) {
                    this.core.gameManager.consoleManager.chatManager.notifyOnlineStatus(friend);
                }
            }

            this.core.gameManager.consoleManager.updateFriend(friend);
        } else {
            this.core.gameManager.consoleManager.addFriend(friend);
            this.core.gameManager.consoleManager.chatManager.addFriend(friend);
            this.core.gameManager.consoleManager.removeRequestUser(friend.id);
        }
    }
}

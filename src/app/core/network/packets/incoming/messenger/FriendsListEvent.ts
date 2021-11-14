import { Incoming } from '../Incoming';
import { Friend } from '../../../../logic/console/Friend';

export class FriendsListEvent extends Incoming {
    public process(): void {
        const unknown1 = this.packet.readInt(); // ??
        const unknown2 = this.packet.readInt(); // ??
        const size = this.packet.readInt();

        const friends: Friend[] = [];

        for (let i = 0; i < size; i++) {
            const id = this.packet.readInt();
            const username = this.packet.readString();
            const male = this.packet.readInt(); // ??
            const isOnline = this.packet.readBoolean();
            const isInRoom = this.packet.readBoolean();
            const figure = this.packet.readString();
            const categoryId = this.packet.readInt(); // ??
            const motto = this.packet.readString();
            const unknown3 = this.packet.readString(); // ??
            const unknown4 = this.packet.readString(); // ??
            const unknown5 = this.packet.readBoolean(); // ??
            const unknown6 = this.packet.readBoolean(); // ??
            const unknown7 = this.packet.readBoolean(); // ??
            const relationshipLevel = this.packet.readShort();

            const friend = new Friend(
                id,
                username,
                isOnline,
                isInRoom,
                figure,
                motto,
                relationshipLevel,
            );

            friends.push(friend);
        }

        // groups, staff chat, ...

        this.core.gameManager.consoleManager.setFriends(friends);
        this.core.gameManager.consoleManager.chatManager.setFriends(friends);
    }
}

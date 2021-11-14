import { Incoming } from '../Incoming';
import { SearchedUser } from '../../../../logic/console/SearchedUser';

export class UserSearchResultEvent extends Incoming {
    public process(): void {
        this.core.gameManager.consoleManager.resetSearchedUsers();

        const currentFriendsSize = this.packet.readInt();

        for (let i = 0; i < currentFriendsSize; i++) {
            this.processSearchedUser();
        }

        const otherPeopleSize = this.packet.readInt();

        for (let i = 0; i < otherPeopleSize; i++) {
            this.processSearchedUser();
        }

        this.core.gameManager.consoleManager.commitSearchedUsersToStore();
    }

    private processSearchedUser(): void {
        const userId = this.packet.readInt();
        const username = this.packet.readString();
        const motto = this.packet.readString();
        const online = this.packet.readBoolean();
        const unknown1 = this.packet.readBoolean(); // ??
        const unknown2 = this.packet.readString(); // ??
        const unknown3 = this.packet.readInt(); // ??
        const figure = this.packet.readString();
        const lastOnline = this.packet.readString();

        const isMe = this.core.player.playerData.id === userId;

        const searchedUser = new SearchedUser(
            userId,
            username,
            motto,
            online,
            figure,
            lastOnline,
            isMe,
        );

        this.core.gameManager.consoleManager.addSearchedUser(searchedUser);
    }
}

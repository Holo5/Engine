import { Incoming } from '../../Incoming';
import { Group } from '../../../../../logic/profile/Group';
import { Profile } from '../../../../../logic/profile/Profile';

export class LoadProfileEvent extends Incoming {
    public process(): void {
        const id = this.packet.readInt();
        const username = this.packet.readString();
        const figure = this.packet.readString();
        const motto = this.packet.readString();
        const registerDate = this.packet.readString();
        const achievementPoints = this.packet.readInt();
        const friendsCount = this.packet.readInt();
        const isMyFriend = this.packet.readBoolean();
        const requestSent = this.packet.readBoolean();
        const isOnline = this.packet.readBoolean();

        const groupsSize = this.packet.readInt();
        const groups = [];

        for (let i = 0; i < groupsSize; i++) {
            const group: Group = this.processGroups();

            groups.push(group);
        }

        const profile = new Profile(
            id,
            username,
            figure,
            motto,
            registerDate,
            achievementPoints,
            friendsCount,
            isMyFriend,
            requestSent,
            isOnline,
            groups,
        );

        this.core.gameManager.profileManager.displayProfile(profile);
    }

    private processGroups(): Group {
        const id = this.packet.readInt();
        const title = this.packet.readString();
        const badge = this.packet.readString();
        const colourA = this.packet.readString();
        const colourB = this.packet.readString();
        const isFavorite = this.packet.readBoolean();
        const unknown = this.packet.readInt();
        const hasForum = this.packet.readBoolean();

        return new Group(
            id,
            title,
            badge,
            colourA,
            colourB,
            isFavorite,
            hasForum,
        );
    }
}

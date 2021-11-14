import { Incoming } from '../../Incoming';
import { UserBanned } from '../../../../../logic/moderation/UserBanned';

export class GetUsersBannedEvent extends Incoming {
    public process(): void {
        const roomId = this.packet.readInt();
        const bansSize = this.packet.readInt();
        const usersBanned: UserBanned[] = [];

        for (let i = 0; i < bansSize; i++) {
            const id = this.packet.readInt();
            const username = this.packet.readString();

            const userBanned = new UserBanned(id, username);

            usersBanned.push(userBanned);
        }

        this.core.gameManager.moderationManager.setUsersBanned(usersBanned);
    }
}

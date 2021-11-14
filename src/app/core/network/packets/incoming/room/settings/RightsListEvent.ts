import { Incoming } from '../../Incoming';
import { User } from '../../../../../logic/permissions/User';

export class RightsListEvent extends Incoming {
    public process(): void {
        const roomId = this.packet.readInt();
        const usersSize = this.packet.readInt();

        const users: User[] = [];

        for (let i = 0; i < usersSize; i++) {
            const userId = this.packet.readInt();
            const username = this.packet.readString();

            const user = new User(userId, username);

            users.push(user);
        }

        this.core.gameManager.permissionsManager.setUsersHasRights(users);
    }
}

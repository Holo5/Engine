import { Incoming } from '../Incoming';
import { RequestUser } from '../../../../logic/console/RequestUser';

export class FriendRequestsEvent extends Incoming {
    public process(): void {
        const requestsSize = this.packet.readInt();
        const requests = this.packet.readInt();
        const users: RequestUser[] = [];

        for (let i = 0; i < requestsSize; i++) {
            const userId = this.packet.readInt();
            const username = this.packet.readString();
            const figure = this.packet.readString();

            const user = new RequestUser(userId, username, figure);

            users.push(user);
        }

        this.core.gameManager.consoleManager.setRequestsUsers(users);
    }
}

import { Incoming } from '../Incoming';
import { RequestUser } from '../../../../logic/console/RequestUser';

export class NewFriendRequestEvent extends Incoming {
    public process(): void {
        const userId = this.packet.readInt();
        const username = this.packet.readString();
        const figure = this.packet.readString();

        const user = new RequestUser(userId, username, figure);

        this.core.gameManager.consoleManager.addRequestUser(user);
    }
}

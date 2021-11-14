import { Incoming } from '../../Incoming';
import { User } from '../../../../../logic/permissions/User';

export class FlatControllerAddedEvent extends Incoming {
    public process(): void {
        const roomId = this.packet.readInt();
        const userId = this.packet.readInt();
        const username = this.packet.readString();

        const user = new User(userId, username);

        this.core.gameManager.permissionsManager.appendUserWithRights(user);
    }
}

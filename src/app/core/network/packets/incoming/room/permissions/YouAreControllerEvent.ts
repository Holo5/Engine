import { Incoming } from '../../Incoming';
import { UserStatus } from '../../../../../logic/permissions/UserStatus';

export class YouAreControllerEvent extends Incoming {
    public process(): void {
        const rightId = this.packet.readInt();
        const roleName = UserStatus.getFromId(rightId);

        this.core.gameManager.permissionsManager.setCurrentUserStatus(roleName);
    }
}

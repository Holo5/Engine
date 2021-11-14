import { Incoming } from '../../Incoming';
import { UserStatusType } from '../../../../../logic/permissions/UserStatusType';

export class YouAreOwnerEvent extends Incoming {
    public process(): void {
        this.core.gameManager.permissionsManager.setCurrentUserStatus(UserStatusType.OWNER);
    }
}

import { Incoming } from '../../Incoming';

export class RemoveRightsEvent extends Incoming {
    public process(): void {
        const roomId = this.packet.readInt();
        const userId = this.packet.readInt();

        this.core.gameManager.permissionsManager.removeUserWithRights(userId);
    }
}

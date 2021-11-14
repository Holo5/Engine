import { Incoming } from '../../Incoming';

export class RoomUserUnbanedEvent extends Incoming {
    public process(): void {
        const roomId = this.packet.readInt();
        const userId = this.packet.readInt();

        this.core.gameManager.moderationManager.unsetBannedUser(userId);
    }
}

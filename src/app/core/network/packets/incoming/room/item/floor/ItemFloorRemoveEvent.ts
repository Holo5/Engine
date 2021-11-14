import { Incoming } from '../../../Incoming';

export class ItemFloorRemoveEvent extends Incoming {
    public process(): void {
        const itemId = parseInt(this.packet.readString());
        const isExpired = this.packet.readBoolean();
        const ownerId = this.packet.readInt();
        const delay = this.packet.readInt();

        // const currentRoom = this.core.gameManager.roomManager.currentRoom;
        // currentRoom.removeItem(itemId);
    }
}

import { Incoming } from '../Incoming';

export class RoomModelEvent extends Incoming {
    public process(): void {
        this.packet.readBoolean();

        const currentRoom = this.core.gameManager.roomManager.currentRoom;
        currentRoom.setRoomModel(this.packet.readInt(), this.packet.readString());
    }
}

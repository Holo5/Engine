import { RoomModelComposer } from '../../outgoing/room/RoomModelComposer';
import { Incoming } from '../Incoming';

export class RoomModelNameEvent extends Incoming {
    public process(): void {
        const room = this.core.gameManager.roomManager.currentRoom;
        const modelName = this.packet.readString();
        room.id = this.packet.readInt();

        this.core.network.socketClient.processOutgoing(new RoomModelComposer());
    }
}

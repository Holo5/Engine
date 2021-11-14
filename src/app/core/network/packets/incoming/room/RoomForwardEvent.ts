import { Incoming } from '../Incoming';

export class RoomForwardEvent extends Incoming {
    public process(): void {
        const roomId = this.packet.readInt();

        this.core.gameManager.navigatorManager.forwardRoom(roomId);
    }
}

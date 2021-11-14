import { Incoming } from '../Incoming';

export class RoomEnterEvent extends Incoming {
    public process(): void {
        this.core.gameManager.roomManager.newRoom();
    }
}

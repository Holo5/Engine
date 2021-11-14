import { Incoming } from '../Incoming';

export class QuitRoomEvent extends Incoming {
    public process(): void {
        this.core.gameManager.roomManager.quitRoom();
    }
}

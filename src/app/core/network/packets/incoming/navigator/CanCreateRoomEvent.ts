import { Incoming } from '../Incoming';

export class CanCreateRoomEvent extends Incoming {
    process(): void {
        this.packet.readInt();
        this.packet.readInt();

        this.core.gameManager.navigatorManager.runRoomCreation();
    }
}

import { Incoming } from '../Incoming';

export class RoomCreatedEvent extends Incoming {
    process(): void {
        const roomId = this.packet.readInt();
        const roomName = this.packet.readString();

        this.core.player.navigateToRoom(roomId);
        this.core.store.dispatch('roomCreation/resetAndHide');
    }
}

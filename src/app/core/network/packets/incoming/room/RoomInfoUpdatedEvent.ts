import { Incoming } from '../Incoming';

export class RoomInfoUpdatedEvent extends Incoming {
    public process(): void {
        const roomId = this.packet.readInt();
    }
}

import { Incoming } from '../Incoming';

export class RoomNotificationMessageEvent extends Incoming {
    public process() {
        const notificationManager = this.core.gameManager.notificationManager;

        const type = this.packet.readString();

        const size = this.packet.readInt();
        for (let i = 0; i < size; i++) {
            const key = this.packet.readString();
            const value = this.packet.readString();

            notificationManager.postNotification(type, key, value);
        }
    }
}

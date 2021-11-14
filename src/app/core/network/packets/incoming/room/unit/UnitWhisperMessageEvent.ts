import { Incoming } from '../../Incoming';

export class UnitWhisperMessageEvent extends Incoming {
    public process(): void {
        const unitId = this.packet.readInt();
        const unitMessage = this.packet.readString();
        const emotionId = this.packet.readInt();
        const bubbleId = this.packet.readInt();

        this.packet.readInt();
        this.packet.readInt();

        this.core.gameManager.chatManager.publishMessage(unitId, unitMessage, bubbleId, true);
    }
}

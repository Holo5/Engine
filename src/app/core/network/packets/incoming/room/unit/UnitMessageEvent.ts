import { Incoming } from '../../Incoming';

export class UnitMessageEvent extends Incoming {
    public process(): void {
        const unitId = this.packet.readInt();
        const unitMessage = this.packet.readString();
        const emotionId = this.packet.readInt();
        const bubbleId = this.packet.readInt();

        this.packet.readInt();
        this.packet.readInt();

        // TODO: attribute emotion to avatar
        this.core.gameManager.chatManager.publishMessage(unitId, unitMessage, bubbleId);
    }
}

import { Incoming } from '../../Incoming';

export class OpenGiftEvent extends Incoming {
    process(): void {
        const definitionType = this.packet.readString();
        const definitionSpriteId = this.packet.readInt();
        const definitionPublicName = this.packet.readString();
        const itemId = this.packet.readInt();
        const itemType = this.packet.readString();
        const isFloorItem = this.packet.readBoolean(); // ??
        const giftExtraData = this.packet.readString(); // todo Mount extradata from string

        console.log(giftExtraData);
    }
}

import { Incoming } from '../../../Incoming';

export class ItemStateEvent extends Incoming {
    public process(): void {
        const itemManager = this.core.gameManager.itemManager;

        const virtualId = this.packet.readInt();
        const spriteId = this.packet.readInt();
        const positionX = this.packet.readInt();
        const positionY = this.packet.readInt();
        const direction = this.packet.readInt();
        const positionZ = this.packet.readString();
        const height = this.packet.readString();

        const unknownInt1 = this.packet.readInt();
        const unknownInt2 = this.packet.readInt();

        const extraData = this.packet.readString();

        itemManager.updateDirection(virtualId, direction);
        itemManager.updateState(virtualId, extraData);

        // I think it's direction/getRotation...

        // msg.writeInt(this.getVirtualId());
        // msg.writeInt(this.getDefinition().getSpriteId());
        // msg.writeInt(this.getPosition().getX());
        // msg.writeInt(this.getPosition().getY());
        // msg.writeInt(this.getRotation());
        // msg.writeString(this.getPosition().getZ());
        // msg.writeString(this.getDefinition().getHeight());

        // itemManager.updateDirection(virtualId, direction);
        // itemManager.updateState(virtualId, extraData);
        // itemManager.updateState(this.packet.readInt(), this.packet.readInt());
    }
}

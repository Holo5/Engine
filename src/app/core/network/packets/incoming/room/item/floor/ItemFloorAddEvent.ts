import { Incoming } from '../../../Incoming';
import { FloorItemType } from '../../../../../../logic/item/enum/FloorItemType';

export class ItemFloorAddEvent extends Incoming {
    public process(): void {
        const itemId = this.packet.readInt();
        const spriteId = this.packet.readInt();
        const positionX = this.packet.readInt();
        const positionY = this.packet.readInt();
        const positionDirection = this.packet.readInt();
        const positionZ = this.packet.readString();
        const positionStackZ = this.packet.readString();
        const unknownType = this.packet.readInt();
        const unknownExtraData1 = this.packet.readInt();
        const furniState = this.packet.readString();
        const unknownLessOneData = this.packet.readInt();
        const canToggle = this.packet.readInt();
        const userId = this.packet.readInt();

        const currentRoom = this.core.gameManager.roomManager.currentRoom;
        // currentRoom.addItem(itemId, spriteId, positionX, positionY, positionDirection, positionZ, positionStackZ, furniState);
    }
}

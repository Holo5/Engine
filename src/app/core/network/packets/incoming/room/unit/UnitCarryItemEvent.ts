import { Incoming } from '../../Incoming';

export class UnitCarryItemEvent extends Incoming {
    public process() {
        const unitId = this.packet.readInt();
        const itemId = this.packet.readInt();

        // const currentRoom = this.core.gameManager.roomManager.currentRoom;
        // const unit = currentRoom.unitManager.findById(unitId);
        //
        // unit.updateRightItem(itemId.toString());
    }
}

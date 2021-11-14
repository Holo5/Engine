import { Incoming } from '../Incoming';

export class RemoveUserItemsEvent extends Incoming {
    public process(): void {
        const virtualId = this.packet.readInt();

        this.core.player.playerInventory.removeInventoryItem(virtualId);
        this.core.gameManager.roomManager.floorItemPlacer.stopPlacingFurni();
    }
}

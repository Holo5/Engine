import { Incoming } from '../../Incoming';

export class UnitRemoveEvent extends Incoming {
    public process(): void {
        const unitManager = this.core.gameManager.unitManager;

        const playerId = this.packet.readString();
        unitManager.removeUnitById(parseInt(playerId));
    }
}

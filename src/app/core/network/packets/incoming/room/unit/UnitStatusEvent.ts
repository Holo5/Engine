import { Incoming } from '../../Incoming';

export class UnitStatusEvent extends Incoming {
    public process(): void {
        const unitLength = this.packet.readInt();
        for (let i = 0; i < unitLength; i++) {
            const unitId = this.packet.readInt();
            const x = this.packet.readInt();
            const y = this.packet.readInt();
            const z = this.packet.readString();
            const headDirection = this.packet.readInt();
            const direction = this.packet.readInt();
            const actions = this.packet.readString();

            this.core.gameManager.unitManager.updateStatus(unitId, x, y, z, headDirection, direction, actions);
        }
    }
}

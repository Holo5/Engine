import { Incoming } from '../../Incoming';

export class ReceivedActivityPointsEvent extends Incoming {
    process(): void {
        const activityPoints = this.packet.readInt();
        const change = this.packet.readInt();
        const unknownNumber = this.packet.readInt();

        this.core.player.playerCurrencies.duckets = activityPoints;
    }
}

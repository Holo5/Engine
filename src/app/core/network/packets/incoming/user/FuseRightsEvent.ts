import { Incoming } from '../Incoming';
import { PlayerRank } from '../../../../logic/client/PlayerRank';

export class FuseRightsEvent extends Incoming {
    process(): void {
        this.packet.readInt();

        const rank = this.packet.readInt();
        const isAmbassador = this.packet.readBoolean();
        const playerRank = new PlayerRank(rank, isAmbassador);

        this.core.player.setPlayerRank(playerRank);
    }
}

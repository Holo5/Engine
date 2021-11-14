import { Incoming } from '../../Incoming';
import { ClubState } from '../../../../../logic/client/ClubState';

export class ClubStatusEvent extends Incoming {
    process(): void {
        const name = this.packet.readString();
        const daysRemaining = this.packet.readInt();

        this.packet.readInt();

        const monthsRemaining = this.packet.readInt();

        this.packet.readInt();

        const isActive = this.packet.readBoolean();

        this.packet.readBoolean();
        this.packet.readInt();
        this.packet.readInt(); // = daysRemaining
        this.packet.readInt(); // = daysRemaining

        const clubState: ClubState = new ClubState(isActive, daysRemaining, monthsRemaining);

        this.core.player.setPlayerClubState(clubState);
    }
}

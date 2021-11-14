import { Incoming } from '../../Incoming';
import { Rating } from '../../../../../logic/settings/Rating';

export class RoomRatingEvent extends Incoming {
    public process(): void {
        const score = this.packet.readInt();
        const canRate = this.packet.readBoolean();

        const rating = new Rating(score, canRate);

        this.core.gameManager.settingsManager.setRating(rating);
    }
}

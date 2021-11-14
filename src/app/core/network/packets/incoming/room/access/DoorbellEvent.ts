import { Incoming } from '../../Incoming';

export class DoorbellEvent extends Incoming {
    public process(): void {
        const username: string = this.packet.readString();

        if (username) {
            this.core.gameManager.doorbellManager.addUserRinging(username);
        } else {
            this.core.gameManager.doorbellManager.setPending(true);
        }
    }
}

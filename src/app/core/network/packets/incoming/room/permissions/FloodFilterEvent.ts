import { Incoming } from '../../Incoming';

export class FloodFilterEvent extends Incoming {
    process(): void {
        const seconds = this.packet.readInt();

        this.core.gameManager.chatManager.setUserFlood(seconds);
    }
}

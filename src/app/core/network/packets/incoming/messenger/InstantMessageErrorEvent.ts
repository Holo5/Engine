import { Incoming } from '../Incoming';
import { Logger } from '../../../../../../common/logger/Logger';

export class InstantMessageErrorEvent extends Incoming {
    public process(): void {
        const num = this.packet.readInt();
        const fromId = this.packet.readInt();

        Logger.warn(`[INSTANT MESSAGE ERROR] num: ${num}; fromId: ${fromId}`);

        this.core.gameManager.consoleManager.chatManager.sendError(fromId, num);
    }
}

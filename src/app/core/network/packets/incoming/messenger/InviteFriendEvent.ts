import { Incoming } from '../Incoming';

export class InviteFriendEvent extends Incoming {
    public process(): void {
        const fromId = this.packet.readInt();
        const message = this.packet.readString();

        this.core.gameManager.consoleManager.chatManager.receiveInvitationMessage(fromId, message);
    }
}

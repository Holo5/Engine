import { Incoming } from '../Incoming';

export class MessageReceivedEvent extends Incoming {
    public process(): void {
        const fromId = this.packet.readInt();
        const message = this.packet.readString();
        const time = this.packet.readInt();

        // This packet can be null
        // ---------------------------------------------------------------
        //
        // const userData = this.packet.readString();
        //
        // if (userData) {
        //     const userParts = userData.split('/');
        //
        //     const username = userParts[0];
        //     const userFigure = userParts[1];
        //     const userId = userParts[2];
        //

        this.core.gameManager.consoleManager.chatManager.receiveMessage(fromId, message);
    }
}

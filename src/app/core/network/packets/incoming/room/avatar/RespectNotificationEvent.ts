import { Incoming } from '../../Incoming';
import { ChatBubble } from '../../../../../logic/chat/ChatBubble';
import { ChatStyles } from '../../../../../logic/chat/ChatStyles';

export class RespectNotificationEvent extends Incoming {
    process(): void {
        const userId = this.packet.readInt();
        const totalRespects = this.packet.readInt();
        const user = this.core.gameManager.unitManager.findByUserId(userId);

        if (userId === this.core.player.playerData.id) {
            this.core.gameManager.notificationManager.sendNotification('Respect', `Tu possèdes désormais ${totalRespects} respects !`);
        }

        const bubble = new ChatBubble(
            user.unitId,
            '',
            '',
            `${user.username} s'est fait respecter !`,
            user.avatarGraphic.graphic.getGlobalPosition().x,
            '#000000',
            ChatStyles.getFromId(1),
            false,
        );

        this.core.gameManager.chatManager.addBubble(bubble);
    }
}

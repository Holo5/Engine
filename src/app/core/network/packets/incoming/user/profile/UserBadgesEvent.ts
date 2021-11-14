import { Incoming } from '../../Incoming';
import { Badge } from '../../../../../logic/badge/Badge';

export class UserBadgesEvent extends Incoming {
    public process(): void {
        const playerId = this.packet.readInt();
        const badgesSize = this.packet.readInt();
        const badges: Badge[] = [];
        const isMe = playerId === this.core.player.playerData.id;

        if (isMe) {
            this.core.player.playerBadges.unslotAll();
        }

        for (let i = 0; i < badgesSize; i++) {
            const badgeSlot = this.packet.readInt();
            const badgeName = this.packet.readString();
            const badgeTextsName = this.core.textManager.getChunk(`badge_name_${badgeName}`);
            const badgeTextsDesc = this.core.textManager.getChunk(`badge_desc_${badgeName}`);

            const badge = new Badge(badgeName, badgeSlot, badgeTextsName, badgeTextsDesc);

            badges.push(badge);

            if (isMe) {
                this.core.player.playerBadges.updateBadgeSlot(badgeName, badgeSlot);
            }
        }

        this.core.gameManager.profileManager.setBadges(badges);
    }
}

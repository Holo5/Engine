import { Incoming } from '../../Incoming';
import { Badge } from '../../../../../logic/badge/Badge';

export class InventoryBadgesEvent extends Incoming {
    private _badges: Badge[];

    public process(): void {
        this._badges = [];
        const badgesSize: number = this.packet.readInt();

        for (let i = 0; i < badgesSize; i++) {
            this.processBadge();
        }

        const badgesSlotSize: number = this.packet.readInt();

        for (let i = 0; i < badgesSlotSize; i++) {
            this.processBadge();
        }

        this.core.player.playerBadges.setBadges(this._badges);
    }

    private processBadge(): void {
        const slot: number = this.packet.readInt();
        const badgeName: string = this.packet.readString();

        if (!this._badges.find((b: Badge) => b.name === badgeName)) {
            const badgeTextsName: string = this.core.textManager.getChunk(`badge_name_${badgeName}`);
            const badgeTextsDesc: string = this.core.textManager.getChunk(`badge_desc_${badgeName}`);

            const badge: Badge = new Badge(badgeName, slot, badgeTextsName, badgeTextsDesc);

            this._badges.push(badge);
        }
    }
}

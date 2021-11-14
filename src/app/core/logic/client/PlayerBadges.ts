import { Badge } from '../badge/Badge';
import { Core } from '../../Core';

export class PlayerBadges {
    public badges: Badge[];

    constructor(public core: Core) {
        this.badges = [];
    }

    private getBadgeFromName(name: string): Badge {
        return this.badges.filter((badge: Badge) => badge.name === name)[0];
    }

    public setBadges(badges: Badge[]): void {
        this.badges = badges;

        this.core.store.commit('inventory/setInventoryBadges', badges);
    }

    public updateBadgeSlot(name: string, slot: number): void {
        const badge = this.getBadgeFromName(name);

        badge.slot = slot;

        this.core.store.commit('inventory/updateBadge', badge);
    }

    public unslotAll(): void {
        this.badges = this.badges.map((badge: Badge) => {
            if (badge.slot >= 1) {
                badge.slot = 0;

                this.core.store.commit('inventory/updateBadge', badge);
            }

            return badge;
        });
    }
}

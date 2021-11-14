import { Configuration } from '../../../conf';
import { EventCategory } from './enum/EventCategory';
import { Graphic } from './Graphic';

export class Badge extends Graphic {
    private badgeId: number;
    private animated: boolean;

    constructor() {
        super();

        this.badgeId = (Math.random() * 19 | 0) + 1;
        this.animated = Math.random() > 0.5;

        this.name = `ACH_BaseJumpWins${this.badgeId}`;
    }

    public needFrameUpdate(): boolean {
        return this.animated;
    }

    public updateFrame() {
        this.isInited = false;
        this.badgeId = (Math.random() * 19 | 0) + 1;
        this.name = `ACH_BaseJumpWins${this.badgeId}`;
    }

    protected getTextureLink(): string {
        return `${Configuration.images.badgeDomain}ACH_BaseJumpWins${this.badgeId}.gif`;
    }

    public getEventCategory(): EventCategory {
        return EventCategory.FLOOR;
    }
}

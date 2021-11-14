import { Configuration } from '../../../../../conf';
import { EventCategory } from '../../../sprite/enum/EventCategory';
import { Graphic } from '../../../sprite/Graphic';

export class PlaceholderVisualization extends Graphic {
    public constructor() {
        super();

        this.name = 'placeholder';
    }

    protected getTextureLink(): string {
        return Configuration.images.furnitureDomain + 'item_placeholder_64.png';
    }

    public getEventCategory(): EventCategory {
        return EventCategory.AVATARS;
    }
}

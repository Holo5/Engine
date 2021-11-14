import { FurnitureItem } from '../FurnitureItem';
import { FurnitureClickedEvent } from '../../../../../../../event/FurnitureEvents';

export class FurnitureLogic {
    private _furnitureItem: FurnitureItem;

    initialize(furnitureItem: FurnitureItem) {
        this._furnitureItem = furnitureItem;

        this.registerEvents();
    }

    registerEvents() {
        this._furnitureItem.visualisation.forEach((object) => {
            // @ts-ignore
            object.graphic.on('click', () => this.clickEvent());
        });
    }

    clickEvent() {
        this._furnitureItem.engine.graphicEventBus.publish(FurnitureClickedEvent({ furnitureItem: this._furnitureItem }));
    }
}

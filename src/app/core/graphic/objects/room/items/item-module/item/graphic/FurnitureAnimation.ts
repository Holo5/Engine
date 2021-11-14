import { IVector3D } from '@holo5/roombuilder';
import { FurnitureItem } from '../FurnitureItem';
import { IAnimation } from '../../../../../object/interfaces/IAnimation';

export class FurnitureAnimation implements IAnimation {
    private _furnitureItem: FurnitureItem;

    constructor(furnitureItem: FurnitureItem) {
        this._furnitureItem = furnitureItem;
    }

    public preDisplay(): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.preDisplay();
        });
    }

    public display(): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.display();
        });
    }

    public ghosted(): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.ghosted();
        });
    }

    public hide(): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.hide();
        });
    }

    public moveTo(mapPosition: IVector3D, screenPosition: IVector3D): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.moveTo(mapPosition, screenPosition);
        });
    }

    public pickup(): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.pickup();
        });
    }

    public place(): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.place();
        });
    }

    public poof(): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.poof();
        });
    }

    public rotateTo(direction: number): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.animation.rotateTo(direction);
        });
    }
}

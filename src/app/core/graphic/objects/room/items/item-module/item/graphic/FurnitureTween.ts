import { IVector3D } from '@holo5/roombuilder';
import { FurnitureItem } from '../FurnitureItem';
import { ITween } from '../../../../../object/interfaces/ITween';

export class FurnitureTween implements ITween {
    private _furnitureItem: FurnitureItem;

    constructor(furnitureItem: FurnitureItem) {
        this._furnitureItem = furnitureItem;
    }

    public displayAnimation(callback?: () => void): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.tween.displayAnimation(callback);
        });
    }

    public translateTo(mapPosition: IVector3D, screenPosition: IVector3D): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.tween.translateTo(mapPosition, screenPosition);
        });
    }

    public startRotation(callback: () => void): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.tween.startRotation(callback);
        });
    }

    public endRotation(): void {
        this._furnitureItem.visualisation.forEach((object) => {
            object.tween.endRotation();
        });
    }
}

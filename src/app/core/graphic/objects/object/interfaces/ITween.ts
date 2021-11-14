import { IVector3D } from '@holo5/roombuilder';

export interface ITween {
    translateTo(mapPosition: IVector3D, screenPosition: IVector3D): void;

    startRotation(callback: () => void): void

    endRotation(): void;

    displayAnimation(callback?: () => void): void;
}

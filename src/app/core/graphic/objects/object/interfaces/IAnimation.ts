import { IVector3D } from '@holo5/roombuilder';

export interface IAnimation {
    preDisplay(): void;
    display(callback?: () => void): void;

    ghosted(): void;

    hide(): void;

    poof(): void;

    pickup(): void;

    place(): void;

    moveTo(mapPosition: IVector3D, screenPosition: IVector3D): void;

    rotateTo(direction: number): void;
}

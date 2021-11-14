import { IVector3D } from '@holo5/roombuilder';
import { Engine } from '../Engine';

export interface IObject {
    mapPosition: IVector3D;
    screenPosition: IVector3D;

    needUpdate(): boolean;

    update(engine: Engine): void;

    updatePositions(mapPosition: IVector3D, screenPosition: IVector3D): void;
}

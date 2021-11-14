import { IVector3D } from '@holo5/roombuilder';
import { IObject } from '../interface/IObject';
import { Engine } from '../Engine';
import { GraphicObject } from '../GraphicObject';
import { ItemVisualization } from './ItemVisualization';

export class ItemObject implements IObject {
    public readonly name: string;
    public readonly layerCount: number;

    public mapPosition: IVector3D;
    public screenPosition: IVector3D;

    public graphicObjects: GraphicObject[];

    public constructor() {
        this.name = 'cloud_egg';
        this.layerCount = 4;

        this.graphicObjects = [];

        for (let i = 0; i < this.layerCount; i++) {
            this.graphicObjects.push(new ItemVisualization(this.name, i));
        }
    }

    public update(engine: Engine): void {

    }

    public updatePositions(mapPosition: IVector3D, screenPosition: IVector3D): void {
        this.graphicObjects.forEach((graphicObject) => graphicObject.updatePositions(mapPosition, screenPosition));
    }
}

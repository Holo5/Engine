import { DrawableTile } from '@holo5/roombuilder';
import { IWallOffset } from './interfaces/IWallOffset';
import { GraphicObject } from '../object/GraphicObject';

export class Wall extends GraphicObject {
    public drawableTile: DrawableTile;
    private _offsets: IWallOffset;

    constructor(
        drawableTile: DrawableTile,
        offsets: IWallOffset,
    ) {
        super();

        this.drawableTile = drawableTile;
        this._offsets = offsets;

        this.graphic.anchor.set(0, 1);
        this.graphic.pluginName = 'batch';
    }

    public getZIndex(): number {
        return this.screenPosition.z;
    }

    public getOffsetX(): number {
        return this._offsets.x;
    }

    public getOffsetY(): number {
        return this._offsets.y;
    }
}

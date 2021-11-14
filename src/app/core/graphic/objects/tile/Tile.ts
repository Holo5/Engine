import { DrawableTile, ObjectType, PositionComputer, WallType } from '@holo5/roombuilder';
import { ITileOffset } from './interfaces/ITileOffset';
import { GraphicObject } from '../object/GraphicObject';
import { EventCategory } from '../object/enums/EventCategory';

export class Tile extends GraphicObject {
    public drawableTile: DrawableTile;
    private _offsets: ITileOffset;

    constructor(
        drawableTile: DrawableTile,
        offsets: ITileOffset,
    ) {
        super();

        this.eventCategory = EventCategory.FLOOR;
        this.drawableTile = drawableTile;
        this._offsets = offsets;
    }

    public getZIndex(): number {
        if (this.drawableTile.wallType === WallType.DOOR_WALL) {
            return PositionComputer.getObjectScreenPosition(this.mapPosition, ObjectType.WALL).z + this.screenPosition.z;
        }
        return this.screenPosition.z;
    }

    public getOffsetX(): number {
        return this._offsets.x;
    }

    public getOffsetY(): number {
        return this._offsets.y;
    }
}

import { DrawableTile, ObjectType, PositionComputer, WallType } from '@holo5/roombuilder';
import { Graphic } from '../../../../sprite/Graphic';
import { ITileOffset } from './interfaces/ITileOffset';
import { Point, Texture } from 'pixi.js';

export class Tile extends Graphic {
    public drawableTile: DrawableTile;

    private offsets: ITileOffset;

    constructor(
        texture: Texture,
        drawableTile: DrawableTile,
        offsets: ITileOffset,
    ) {
        super(texture);

        this.drawableTile = drawableTile;
        this.offsets = offsets;

        this.visible = true;
    }

    public updatePosition(stageOffset: Point) {
        this.position.set(
            stageOffset.x + this.currentPosition.x + this.offsets.x,
            stageOffset.y + this.currentPosition.y + this.offsets.y,
        );
        this.zIndex = this.getZIndex();
        this.positionUpdate = false;
        this.updateBounds();
    }

    public getZIndex(): number {
        if (this.drawableTile.wallType === WallType.DOOR_WALL) {
            return PositionComputer.getObjectScreenPosition(this.drawableTile.position, ObjectType.WALL).z + this.currentPosition.z;
        }
        return this.currentPosition.z;
    }

}

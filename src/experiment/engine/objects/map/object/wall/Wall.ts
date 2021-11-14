import { DrawableTile } from '@holo5/roombuilder';
import { Graphic } from '../../../../sprite/Graphic';
import { IWallOffset } from './interfaces/IWallOffset';
import { Point, Texture } from 'pixi.js';

export class Wall extends Graphic {
    public drawableTile: DrawableTile;

    private offsets: IWallOffset;

    constructor(
        texture: Texture,
        drawableTile: DrawableTile,
        offsets: IWallOffset,
    ) {
        super(texture);

        this.drawableTile = drawableTile;
        this.offsets = offsets;

        this.visible = true;
        this.anchor.set(0, 1);
    }

    public updatePosition(stageOffset: Point) {
        this.position.set(
            stageOffset.x + this.currentPosition.x + this.offsets.x,
            stageOffset.y + this.currentPosition.y + this.offsets.y,
        );
        this.zIndex = this.currentPosition.z;
        this.positionUpdate = false;
        this.updateBounds();
    }
}

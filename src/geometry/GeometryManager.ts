import { Engine } from '../Engine';
import { Point, Rectangle } from 'pixi.js';
import { Stage } from './Stage';

export class GeometryManager {
    public engine: Engine;
    public needSizeUpdate: boolean;
    public needPositionUpdate: boolean;
    public stageBounds: Rectangle;
    public stageOffset: Point;

    public constructor(public stage: Stage) {
        this.needSizeUpdate = false;
        this.needPositionUpdate = true;

        this.stageBounds = new Rectangle();
        this.stageOffset = new Point();

        window.onresize = () => {
            this.checkStageSize();
        };
    }

    public update() {
        if (this.stage.eventManager.currentEvents.dragging) {
            this.needPositionUpdate = true;
            this.stageOffset.x += this.stage.eventManager.currentEvents.cursorOffset.x | 0;
            this.stageOffset.y += this.stage.eventManager.currentEvents.cursorOffset.y | 0;
        }
    }

    public reset() {
        this.needPositionUpdate = false;
        this.needSizeUpdate = false;
    }

    public checkStageSize() {
        this.stageBounds = new Rectangle(0, 0, this.stage.engine.canvasContainer.clientWidth | 0, this.stage.engine.canvasContainer.clientHeight | 0);
        this.needSizeUpdate = true;
    }
}

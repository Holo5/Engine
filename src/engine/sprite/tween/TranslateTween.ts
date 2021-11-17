import { IGraphic } from '../interface/IGraphic';
import { ITweenVars } from './interface/ITweenVars';
import { Tween } from './Tween';

export class TranslateTween extends Tween {
    private differentialData: ITweenVars;

    private lastPercent: number;

    constructor(
        graphic: IGraphic,
        duration: number,
        private properties: ITweenVars,
    ) {
        super(graphic, duration);

        this.lastPercent = 0;
    }

    public execute(percent: number): void {
        if (this.differentialData === undefined) this.computeDifferentialData();

        let delta = (percent - this.lastPercent);

        if (this.differentialData.positions !== undefined) {
            this.graphic.setPosition({
                x: this.graphic.currentPosition.x + (this.differentialData.positions.x * delta) | 0,
                y: this.graphic.currentPosition.y + (this.differentialData.positions.y * delta) | 0,
                z: this.graphic.currentPosition.z + (this.differentialData.positions.z * delta),
            });
        }

        if (this.differentialData.alpha !== undefined) {
            this.graphic.alpha = this.graphic.alpha + (this.differentialData.alpha * delta);
        }

        this.lastPercent = percent;
    }

    private computeDifferentialData(): void {
        this.differentialData = {
            positions: undefined,
            alpha: undefined,
        };

        if (this.properties.positions !== undefined) {
            this.differentialData.positions = {
                x: this.properties.positions.x - this.graphic.currentPosition.x,
                y: this.properties.positions.y - this.graphic.currentPosition.y,
                z: this.properties.positions.z - this.graphic.currentPosition.z,
            };
        }

        if (this.properties.alpha !== undefined) {
            this.differentialData.alpha = this.properties.alpha - this.graphic.alpha;
        }
    }
}

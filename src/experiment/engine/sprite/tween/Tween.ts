import { IGraphic } from '../interface/IGraphic';
import { ITween } from './interface/ITween';

export abstract class Tween implements ITween {
    public complete: boolean;

    protected startTime: number;

    public constructor(
        protected graphic: IGraphic,
        protected duration: number,
    ) {
        this.complete = false;
    }

    public update(now: number) {
        if (this.complete) return;

        if (this.startTime === undefined) this.startTime = now;

        let percent = (now - this.startTime) / this.duration;
        if (percent > 1) percent = 1;

        this.execute(percent);

        if (now > this.startTime + this.duration) this.complete = true;
    }

    public abstract execute(percent: number): void;
}

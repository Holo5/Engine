export class DoubleTicker{
    private intervalWorker: Worker;

    private maxAnimationRate: number;
    private maxDisplayRate: number;
    private frame: number;

    private animationTickCallback: () => void;
    private displayTickCallback: () => void;

    constructor(maxAnimationRate: number, maxDisplayRate: number) {
        this.intervalWorker = new Worker('IntervalWorker.js');

        this.updateMaxAnimationRate(maxAnimationRate);
        this.updateMaxDisplayRate(maxDisplayRate);

        this.intervalWorker.onmessage = (m) => this.tick(m);
    }

    public attachCallbacks(animationTickCallback: () => void, displayTickCallback: () => void) {
        this.animationTickCallback = animationTickCallback;
        this.displayTickCallback = displayTickCallback;
    }

    public updateMaxAnimationRate(maxAnimationRate: number) {
        this.maxAnimationRate = maxAnimationRate;
        this.intervalWorker.postMessage({ animationRate: this.maxAnimationRate, displayRate: this.maxDisplayRate });
    }

    public updateMaxDisplayRate(maxFPS: number) {
        this.maxDisplayRate = maxFPS;
        this.intervalWorker.postMessage({ animationRate: this.maxAnimationRate, displayRate: this.maxDisplayRate });
    }

    private tick(message: MessageEvent) {
        if (message.data === 'animation') {
            this.animationTickCallback();
        }

        if (message.data === 'display') {
            this.displayTickCallback();
        }
    }
}

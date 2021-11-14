type Callback = (frame: number) => void;

export class Ticker {
    private _tickerListeners: Map<string, (frame: number) => void>;
    private _currentFrame: number;
    private _lastTime: number;
    private _time: number;
    private _interval: any;

    constructor() {
        this._tickerListeners = new Map<string, Callback>();
        this._currentFrame = 0;
        this._time = 1000 / 8;

        // TODO Faire un truc bien cool pour stopper les animations lors de la perte du focus (cf. Anis)
        // window.onfocus = (e) => {
        //     console.log("state", document.visibilityState, document.hidden);
        //     this.start();
        // }
        // window.onblur = (e) => {
        //     console.log("state", document.visibilityState, document.hidden);
        //     this.stop();
        // }

        // document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this), false);
    }

    // handleVisibilityChange() {
    //     if (document.hidden) {
    //         console.log("hidden");
    //     } else {
    //         console.log("visible");
    //     }
    // }

    private _intervalCallback() {
        this._currentFrame++;
        this._tickerListeners.forEach((e) => e(this._currentFrame));
    }

    start() {
        if (this._interval !== undefined) return;
        this._interval = setInterval(() => {
            this._intervalCallback();
        }, this._time);
    }

    stop() {
        clearInterval(this._interval);
        this._interval = undefined;
    }

    add(graphicGuid: string, fn: (frame: number) => void): this {
        this._tickerListeners.set(graphicGuid, fn);
        return this;
    }

    remove(graphicGuid: string): this {
        this._tickerListeners.delete(graphicGuid);
        return this;
    }
}

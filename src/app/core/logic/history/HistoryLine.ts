import { EHistoryLineType } from './enum/EHistoryLineType';

export class HistoryLine {
    private _body: string;
    private _time: string;
    private _type: EHistoryLineType;

    constructor(body: string, type: EHistoryLineType, time: string) {
        this._body = body;
        this._type = type;
        this._time = time;
    }

    get body() {
        return this._body;
    }

    get time(): string {
        return this._time;
    }

    get type(): EHistoryLineType {
        return this._type;
    }
}

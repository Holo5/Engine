import { HistoryLine } from './HistoryLine';
import { EHistoryLineType } from './enum/EHistoryLineType';

export class Chat extends HistoryLine {
    private readonly _username: string;
    private readonly _whisper: boolean;

    constructor(username: string, message: string, time: string, whisper: boolean) {
        super(message, EHistoryLineType.USER, time);

        this._username = username;
        this._whisper = whisper;
    }

    get username(): string {
        return this._username;
    }

    get isWhisper(): boolean {
        return this._whisper;
    }
}

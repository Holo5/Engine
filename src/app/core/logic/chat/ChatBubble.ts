import { IStyle } from './interfaces/IStyle';

export class ChatBubble {
    readonly unitId: number;
    readonly unitName: string;
    readonly unitAvatar: string;
    readonly unitMessage: string;
    readonly unitPositionScreenX: number;
    readonly textColor: string;
    readonly bubbleStyle: IStyle;
    readonly whisper: boolean;

    constructor(
        unitId: number,
        unitName: string,
        unitAvatar: string,
        unitMessage: string,
        unitPositionScreenX: number,
        textColor: string,
        bubbleStyle: IStyle,
        whisper: boolean,
    ) {
        this.unitId = unitId;
        this.unitName = unitName;
        this.unitAvatar = unitAvatar;
        this.unitMessage = unitMessage;
        this.unitPositionScreenX = unitPositionScreenX;
        this.textColor = textColor;
        this.bubbleStyle = bubbleStyle;
        this.whisper = whisper;
    }
}

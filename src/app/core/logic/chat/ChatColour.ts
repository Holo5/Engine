import { IColor } from './interfaces/IColor';

export class ChatColour {
    static colours: IColor[] = [
        { from: '@red@', to: 'FF0000' },
        { from: '@cyan@', to: '00FFFF' },
        { from: '@blue@', to: '0000FF' },
        { from: '@green@', to: '00FF00' },
        { from: '@purple@', to: '800080' },
    ];

    static extractColourFromMessage(message: string) {
        let finalMessage = message;
        let extractedColor = '000000';

        this.colours.forEach((color: IColor) => {
            if (finalMessage.indexOf(color.from) !== -1) {
                finalMessage = finalMessage.substr(color.from.length);
                extractedColor = color.to;
            }
        });

        return [finalMessage, extractedColor];
    }
}

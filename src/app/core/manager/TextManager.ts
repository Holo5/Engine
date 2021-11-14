import { Configuration } from '../../../conf';

export class TextManager {
    private _regexDefinition: RegExp;
    private _translations: Map<string, string>;

    constructor() {
        this._regexDefinition = new RegExp(/\${(.*?)}/gim);
        this._translations = new Map<string, string>();
    }

    async init() {
        const response = await fetch(Configuration.global.externalText, { mode: 'no-cors' }).then((res) => res.text());

        response.split('\n').forEach((line) => {
            const text = line.trim();
            if (text.includes('=')) {
                const data = text.split('=');
                this._translations.set(data[0], data[1]);
            }
        });
    }

    getChunk(definition: string) {
        return this._translations.get(definition);
    }

    getMessage(definition: string) {
        const data = definition.match(this._regexDefinition);
        if (data === null || data.length === 0) return definition;

        let finalString = definition;
        data.forEach((str) => {
            const chunk = this.getChunk(str.substring(2, str.length - 1));
            if (chunk !== undefined) {
                finalString = finalString.replace(str, chunk);
            }
        });

        return finalString;
    }
}

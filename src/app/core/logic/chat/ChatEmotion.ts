import { EChatEmotion } from './enum/EChatEmotion';

export class ChatEmotion {
    static getFromValue(value: number): string {
        return Object.keys(EChatEmotion).filter((key: any) => EChatEmotion[key])[0];
    }
}

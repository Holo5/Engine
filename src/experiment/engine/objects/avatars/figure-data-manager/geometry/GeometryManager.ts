import { AvatarPosture } from '../../enums/AvatarPosture';
import { GeometryData } from './GeometryData';

export class GeometryManager {
    private _draworder: {
        'sitting': string[],
        'horizontal': string[],
        'vertical': string[]
    };

    private generate(bodyParts: any): string[] {
        const orderedBodyParts: string[] = [];

        Object.keys(bodyParts).sort((a: string, b: string) => {
            if (bodyParts[a].radius > bodyParts[b].radius) return 1;
            if (bodyParts[a].radius < bodyParts[b].radius) return -1;
            return 0;
        }).some((key) => {
            if (bodyParts[key].items !== undefined) {
                Object.keys(bodyParts[key].items).sort((c: string, d: string) => {
                    if (bodyParts[key].items[c].radius > bodyParts[key].items[d].radius) return 1;
                    if (bodyParts[key].items[c].radius < bodyParts[key].items[d].radius) return -1;
                    return 0;
                }).forEach((id) => {
                    orderedBodyParts.push(id);
                });
            }
        });

        return orderedBodyParts;
    }

    init() {
        this._draworder = {
            sitting: this.generate(GeometryData.sitting),
            horizontal: this.generate(GeometryData.horizontal),
            vertical: this.generate(GeometryData.vertical),
        };
    }

    getDraworder(posture: AvatarPosture, direction: number = 2) {
        if (posture === AvatarPosture.POSTURE_SIT) {
            return this._draworder.sitting;
        }
        if (posture === AvatarPosture.POSTURE_LAY) {
            return this._draworder.horizontal;
        }
        return this._draworder.vertical;
    }
}

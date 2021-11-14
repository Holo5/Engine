import { IVector3D } from '@holo5/roombuilder';

const ANGLE_HABBO: any = { 0: 2, 45: 3, 90: 4, 135: 5, 180: 6, '-135': 7, '-90': 0, '-45': 1 };

export class GraphicUtils {
    static directionComputer(actualPosition: IVector3D, nextPosition: IVector3D): string {
        const deltaX = nextPosition.x - actualPosition.x;
        const deltaY = nextPosition.y - actualPosition.y;
        const rad = Math.atan2(deltaY, deltaX); // In radians
        const angle = rad * (180 / Math.PI);

        return ANGLE_HABBO[angle.toString()];
    }
}

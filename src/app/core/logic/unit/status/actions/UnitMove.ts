import { IVector3D, ObjectType, PositionComputer, Vector3d } from '@holo5/roombuilder';
import { UnitUser } from '../../UnitUser';
import { UnitStatusType } from '../UnitStatusType';
import { UnitAction } from './UnitAction';
import { AvatarPosture } from '../../../../graphic/objects/room/avatars/avatar-module/enums/AvatarPosture';
import { Logger } from '../../../../../../common/logger/Logger';

export class UnitMove extends UnitAction {
    private _mapPosition: IVector3D;

    public constructor(x: number, y: number, z: number) {
        super(UnitStatusType.MOVE);

        this._mapPosition = new Vector3d(x, y, z);
    }

    public static fromValue(value: string) {
        const [posX, posY, posZ] = value.split(',');
        return new UnitMove(parseInt(posX), parseInt(posY), parseFloat(posZ));
    }

    public process(unit: UnitUser): void {
        try {
            const screenPosition = PositionComputer.getObjectScreenPosition(this._mapPosition, ObjectType.AVATAR);
            unit.avatarGraphic.animation.moveTo(this._mapPosition, screenPosition);
            unit.updatePosture(AvatarPosture.POSTURE_WALK);
            unit.updateGraphic();
        } catch (e) {
            Logger.error(`Can't move on tile [${this._mapPosition.x},${this._mapPosition.y}]. Maybe tile doesn't exist ?`);
            Logger.error(e);
        }
    }

    public finish(unit: UnitUser): void {
        unit.updatePosture(AvatarPosture.POSTURE_STAND);
    }
}

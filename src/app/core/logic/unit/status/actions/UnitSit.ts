import { Vector3d } from '@holo5/roombuilder';
import { UnitUser } from '../../UnitUser';
import { UnitStatusType } from '../UnitStatusType';
import { UnitAction } from './UnitAction';
import { AvatarPosture } from '../../../../graphic/objects/room/avatars/avatar-module/enums/AvatarPosture';
import { Logger } from '../../../../../../common/logger/Logger';

export class UnitSit extends UnitAction {
    private _z: string;

    public constructor(z: string) {
        super(UnitStatusType.SIT);

        this._z = z;
    }

    public static fromValue(value: string) {
        return new UnitSit(value);
    }

    public process(unit: UnitUser): void {
        try {
            const mapPosition = unit.getPositions().map;
            const newMapPosition = new Vector3d(mapPosition.x, mapPosition.y, mapPosition.z + parseFloat(this._z));
            unit.updatePositions(newMapPosition);
            unit.updatePosture(AvatarPosture.POSTURE_SIT);
            unit.updateGraphic();
        } catch (e) {
            Logger.error('Can\'t sit... :(');
            Logger.error(e);
        }
    }

    public finish(unit: UnitUser): void {
        unit.updatePosture(AvatarPosture.POSTURE_STAND);
    }
}

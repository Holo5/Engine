import { IVector3D } from '@holo5/roombuilder';
import { UnitUser } from './UnitUser';
import { Core } from '../../Core';
import { ObjectManager } from '../ObjectManager';

export class UnitManager extends ObjectManager<number, UnitUser> {
    public constructor(core: Core) {
        super(core);
    }

    public addUnitUser(
        unitId: number,
        userId: number,
        username: string,
        motto: string,
        figure: string,
        mapPosition: IVector3D,
        direction: number,
    ) {
        const unit = new UnitUser(this.engine.avatarModule, unitId, userId, username, motto, figure, mapPosition, direction);
        this.add(unitId, unit);

        unit.buildGraphic();
        this.engine.sortableContainer.addGraphicObject(unit.avatarGraphic);
    }

    public findByUserId(unitUserId: number): UnitUser {
        let user: UnitUser;

        this.objects.forEach((unitUser: UnitUser) => {
            if (unitUser.userId === unitUserId) {
                user = unitUser;
            }
        });

        return user;
    }

    public updateStatus(unitId: number, x: number, y: number, z: string, headDirection: number, direction: number, action: string) {
        const unit = this.find(unitId);
        if (unit !== undefined) {
            unit.updateDirection(direction);
            unit.actionManager.parseFromString(action);
            unit.actionManager.commit();
        }
    }
}

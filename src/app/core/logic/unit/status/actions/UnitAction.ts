import { Unit } from '../../Unit';
import { UnitStatusType } from '../UnitStatusType';
import { Room } from '../../../room/Room';

export abstract class UnitAction {
    private _unitStatusType: UnitStatusType;

    public constructor(
        unitStatusType: UnitStatusType,
    ) {
        this._unitStatusType = unitStatusType;
    }

    public abstract process(unit: Unit): void;

    public abstract finish(unit: Unit): void;

    get unitStatusType(): UnitStatusType {
        return this._unitStatusType;
    }
}

import { UnitUser } from '../../UnitUser';
import { UnitStatusType } from '../UnitStatusType';
import { UnitAction } from './UnitAction';

export class UnitFlatCtrl extends UnitAction {
    private _right: number;

    public constructor(right: number) {
        super(UnitStatusType.FLAT_CONTROL);

        this._right = right;
    }

    public static fromValue(value: string) {
        const right = parseInt(value);
        return new UnitFlatCtrl(right);
    }

    public process(unit: UnitUser): void {

    }

    public finish(unit: UnitUser): void {
    }
}

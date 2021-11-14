import { Unit } from '../Unit';
import { UnitAction } from './actions/UnitAction';
import { UnitFlatCtrl } from './actions/UnitFlatCtrl';
import { UnitMove } from './actions/UnitMove';
import { UnitStatusType } from './UnitStatusType';
import { UnitSit } from './actions/UnitSit';
import { Room } from '../../room/Room';

export class UnitStatusManager {
    private _unit: Unit;
    private _actions: UnitAction[];
    private _lastActions: UnitAction[];

    constructor(unit: Unit) {
        this._unit = unit;
        this._actions = [];
        this._lastActions = [];
    }

    private checkEndingStatus() {
        if (this._lastActions.length === 0) {
            return;
        }

        this._lastActions.forEach((lastAction) => {
            const currentAction = this._actions.find((action) => action.unitStatusType === lastAction.unitStatusType);
            if (currentAction === undefined) {
                lastAction.finish(this._unit);
            }
        });
    }

    public parseFromString(actions: string) {
        const splitted = actions.split('/');

        for (let i = 1; i < splitted.length - 1; i++) {
            const [key, value] = splitted[i].split(' ');

            switch (key) {
                case UnitStatusType.FLAT_CONTROL:
                    this._actions.push(UnitFlatCtrl.fromValue(value));
                    break;
                case UnitStatusType.MOVE:
                    this._actions.push(UnitMove.fromValue(value));
                    break;
                case UnitStatusType.SIT:
                    this._actions.push(UnitSit.fromValue(value));
                    break;
                default:
                    break;
            }
        }
    }

    public commit() {
        this.checkEndingStatus();

        this._actions.forEach((action) => {
            action.process(this._unit);
        });

        this._lastActions = this._actions;
        this._actions = [];
    }
}

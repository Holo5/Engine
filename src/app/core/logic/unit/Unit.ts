import { IVector3D, ObjectType, PositionComputer } from '@holo5/roombuilder';
import { UnitStatusManager } from './status/UnitStatusManager';
import { Disposable } from '../../../../common/disposable/Disposable';
import { AvatarModule } from '../../graphic/objects/room/avatars/avatar-module/AvatarModule';

export class Unit extends Disposable {
    public readonly unitId: number;

    protected _avatarModule: AvatarModule;
    protected _mapPosition: IVector3D;
    protected _screenPosition: IVector3D;
    protected _direction: number;

    private _actionManager: UnitStatusManager;

    constructor(avatarModule: AvatarModule, unitId: number, mapPosition: IVector3D, direction: number) {
        super();

        this._avatarModule = avatarModule;

        this.unitId = unitId;
        this._mapPosition = mapPosition;
        this._direction = direction;
        this._actionManager = new UnitStatusManager(this);
    }

    public updatePositions(mapPosition: IVector3D, screenPosition: IVector3D = undefined) {
        this._mapPosition = mapPosition;

        if (screenPosition === undefined) {
            this._screenPosition = PositionComputer.getObjectScreenPosition(mapPosition, ObjectType.AVATAR);
        } else {
            this._screenPosition = screenPosition;
        }

        return this;
    }

    public updateDirection(direction: number) {
        this._direction = direction;

        return this;
    }

    getPositions(): { map: IVector3D, screen: IVector3D } {
        return {
            map: this._mapPosition,
            screen: this._screenPosition,
        };
    }

    get actionManager(): UnitStatusManager {
        return this._actionManager;
    }

    public onDispose(): void {

    }
}

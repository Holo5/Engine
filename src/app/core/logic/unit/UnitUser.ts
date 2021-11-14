import { IVector3D } from '@holo5/roombuilder';
import { Unit } from './Unit';
import { AvatarPartsContainer } from '../../graphic/objects/room/avatars/avatar-module/avatar-parts/AvatarPartsContainer';
import { AvatarPosture } from '../../graphic/objects/room/avatars/avatar-module/enums/AvatarPosture';
import { AvatarModule } from '../../graphic/objects/room/avatars/avatar-module/AvatarModule';
import { AvatarGesture } from '../../graphic/objects/room/avatars/avatar-module/enums/AvatarGesture';

export class UnitUser extends Unit {
    protected _avatarGraphic: AvatarPartsContainer;
    protected _username: string;
    protected _motto: string;
    protected _figure: string;
    private _userId: number;

    constructor(
        avatarModule: AvatarModule,
        unitId: number,
        userId: number,
        username: string,
        motto: string,
        figure: string,
        mapPosition: IVector3D,
        direction: number,
    ) {
        super(avatarModule, unitId, mapPosition, direction);

        this._userId = userId;
        this._username = username;
        this._motto = motto;
        this._figure = figure;

        this.updatePositions(mapPosition);
    }

    public dispose() {
        this._avatarGraphic.dispose();
    }

    public buildGraphic() {
        this._avatarGraphic = this._avatarModule.buildFromFigure(this._figure);
        this._avatarGraphic.updateFromVectors(this._mapPosition, this._screenPosition);
        this._avatarGraphic.updateDirection(this._direction);
    }

    public updateGraphic() {
        this._avatarGraphic.updateDirection(this._direction);
    }

    public updatePosture(posture: AvatarPosture) {
        this._avatarGraphic.updatePosture(posture);
    }

    public updateGesture(gesture: AvatarGesture) {
        this._avatarGraphic.updateGesture(gesture);
    }

    public updateRightItem(id: string) {
        this._avatarGraphic.updateRightItem(id);
    }

    public get avatarGraphic(): AvatarPartsContainer {
        return this._avatarGraphic;
    }

    get userId(): number {
        return this._userId;
    }

    get username(): string {
        return this._username;
    }

    get motto(): string {
        return this._motto;
    }

    get figure(): string {
        return this._figure;
    }
}

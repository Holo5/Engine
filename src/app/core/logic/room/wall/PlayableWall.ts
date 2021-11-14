import { IVector3D } from '@holo5/roombuilder';
import { Engine } from '../../../graphic/engine/Engine';
import { Disposable } from '../../../../../common/disposable/Disposable';
import { Wall } from '../../../graphic/objects/wall/Wall';

export class PlayableWall extends Disposable {
    public engine: Engine;
    public wall: Wall;

    private _mapPosition: IVector3D;
    private _screenPosition: IVector3D;

    constructor(
        engine: Engine,
        wall: Wall,
        mapPosition: IVector3D,
        screenPosition: IVector3D,
    ) {
        super();

        this.engine = engine;
        this.wall = wall;
        this._mapPosition = mapPosition;
        this._screenPosition = screenPosition;

        this.wall.addInContainerAndDisplay(this.engine.sortableContainer);
    }

    onDispose() {
        this.engine.sortableContainer.removeGraphicObject(this.wall);
        this.wall.dispose();
    }
}

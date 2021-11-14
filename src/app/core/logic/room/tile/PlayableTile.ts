import { IVector3D } from '@holo5/roombuilder';
import { Engine } from '../../../graphic/engine/Engine';
import { Tile } from '../../../graphic/objects/tile/Tile';
import { TileClickedEvent, TileHoveredEvent, TileRestedEvent } from '../../../event/TileEvents';
import { Disposable } from '../../../../../common/disposable/Disposable';

export class PlayableTile extends Disposable {
    public engine: Engine;
    public tile: Tile;

    private _mapPosition: IVector3D;
    private _screenPosition: IVector3D;
    private _stackable: boolean;
    private _heightMap: number;

    constructor(
        engine: Engine,
        tile: Tile,
        mapPosition: IVector3D,
        screenPosition: IVector3D,
    ) {
        super();

        this.engine = engine;
        this.tile = tile;
        this._mapPosition = mapPosition;
        this._screenPosition = screenPosition;

        this._stackable = true;
        this._heightMap = 0;

        // @ts-ignore
        this.tile.graphic.on('click', () => {
            engine.graphicEventBus.publish(TileClickedEvent({ mapPosition: this._mapPosition }));
        });

        this.tile.graphic.on('mouseover', () => {
            engine.graphicEventBus.publish(TileHoveredEvent({ mapPosition: this._mapPosition, stackHeight: this._heightMap }));
        });

        this.tile.graphic.on('mouseout', () => {
            engine.graphicEventBus.publish(TileRestedEvent({ mapPosition: this._mapPosition }));
        });

        this.tile.addInContainerAndDisplay(this.engine.sortableContainer);
    }

    onDispose() {
        this.engine.sortableContainer.removeGraphicObject(this.tile);
    }

    changeHeightMap(height: number) {
        this._heightMap = height;
    }
}

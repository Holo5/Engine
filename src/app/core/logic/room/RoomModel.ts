import { DrawableTile, FloorType, PositionComputer, RoomGenerator, WallType, ObjectType } from '@holo5/roombuilder';
import { Disposable } from '../../../../common/disposable/Disposable';
import { Engine } from '../../graphic/engine/Engine';
import { PlayableTile } from './tile/PlayableTile';
import { Configuration } from '../../../../conf';
import { PlayableWall } from './wall/PlayableWall';

export class RoomModel extends Disposable {
    public engine: Engine;

    private _wallHeight: number;
    private _model: string;
    private _roomGenerator: RoomGenerator;
    private _heightMaps: Map<string, number>;
    private _playableTiles: PlayableTile[];
    private _playableWalls: PlayableWall[];

    constructor(
        engine: Engine,
    ) {
        super();

        this.engine = engine;

        this._roomGenerator = new RoomGenerator();

        this._heightMaps = new Map<string, number>();
        this._playableTiles = [];
        this._playableWalls = [];
    }

    private formatLocationName(mapX: number, mapY: number) {
        return `${mapX.toString()};${mapY.toString()}`;
    }

    public onDispose(): void {
        this._playableTiles.forEach((playableTile) => {
            playableTile.dispose();
        });

        this._playableWalls.forEach((playableWall) => {
            playableWall.dispose();
        });
    }

    public computeMap(wallHeight: number, model: string) {
        this._wallHeight = wallHeight === -1 ? 0 : wallHeight;
        this._model = model;

        PositionComputer.setOffsets(0, 0);
        const room = this._roomGenerator.generateRoom(this._model);

        room.drawableTiles.forEach((drawableTile: DrawableTile) => {
            if (drawableTile.floorType !== FloorType.BORDER_UNUSABLE) {
                const tile = this.engine.tileFactory.tileFromLocation(
                    Configuration.room.tiles.defaultMaterial,
                    drawableTile,
                    Configuration.room.tiles.defaultThickness,
                    drawableTile.position,
                    PositionComputer.getObjectScreenPosition(drawableTile.position, ObjectType.TILE),
                );

                const playableTile = new PlayableTile(this.engine, tile, drawableTile.position, PositionComputer.getObjectScreenPosition(drawableTile.position, ObjectType.TILE));
                this._playableTiles.push(playableTile);

                if (drawableTile.wallType !== WallType.NONE) {
                    const wall = this.engine.wallFactory.wallFromLocation(
                        Configuration.room.walls.defaultMaterial,
                        drawableTile,
                        wallHeight,
                        Configuration.room.walls.defaultThickness,
                        Configuration.room.tiles.defaultThickness,
                        drawableTile.position,
                        PositionComputer.getObjectScreenPosition(drawableTile.position, ObjectType.WALL),
                    );

                    const playableWall = new PlayableWall(this.engine, wall, drawableTile.position,
                        PositionComputer.getObjectScreenPosition(drawableTile.position, ObjectType.WALL));
                    this._playableWalls.push(playableWall);
                }
            }
        });

        this.engine.sortableContainer.center();
    }

    setHeightMap(mapX: number, mapY: number, height: number) {
        this._heightMaps.set(this.formatLocationName(mapX, mapY), height);
    }

    hideAllWalls() {
        this._playableWalls.forEach((playableWall) => playableWall.wall.animation.hide());
    }
}

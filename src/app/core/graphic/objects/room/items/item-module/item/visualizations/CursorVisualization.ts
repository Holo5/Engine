import { IVector3D, ObjectType, PositionComputer } from '@holo5/roombuilder';
import { FurnitureVisualization } from './FurnitureVisualization';
import { IFurniProperty } from '../interfaces/IFurniProperty';
import { FurniData } from '../../assets-manager/FurniData';
import { Engine } from '../../../../../../engine/Engine';
import { TileHoveredEvent, TileRestedEvent } from '../../../../../../../event/TileEvents';

export class CursorVisualization extends FurnitureVisualization {
    constructor(
        engine: Engine,
        furniData: FurniData,
        layerId: number,
        furniProperty: IFurniProperty,
        mapPosition: IVector3D,
        screenPosition: IVector3D,
        textures: any,
        index: number = 0,
    ) {
        super(engine, furniData, layerId, furniProperty, mapPosition, screenPosition, textures, index);

        this.engine.graphicEventBus.subscribe(TileRestedEvent, (e) => {
            this.fixedAlpha = 0;
            this.graphic.alpha = 0;
        });

        this.engine.graphicEventBus.subscribe(TileHoveredEvent, (e) => {
            this.updateFromVectors(e.payload.mapPosition, PositionComputer.getScreenPosition(e.payload.mapPosition));
            this.fixedAlpha = 1;
            this.graphic.alpha = 1;
        });
    }

    protected attachAttributes() {
    }

    protected retrieveFrames() {
        const textureName = 'TileCursor_tile_cursor_64_a_0_0';
        if (this._texturesDictionnary[textureName] !== undefined) {
            this.graphic.texture = this._texturesDictionnary[textureName];
            this.graphic.renderable = true;
        } else {
            this.graphic.renderable = false;
        }
    }

    public getZIndex(): number {
        const screenPosition = PositionComputer.getObjectScreenPosition(this.mapPosition, ObjectType.TILE_SELECTOR);
        this.screenPosition = screenPosition;

        return screenPosition.z;
    }
}

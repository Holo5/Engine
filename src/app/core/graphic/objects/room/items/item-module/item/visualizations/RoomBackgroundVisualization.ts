import * as PIXI from 'pixi.js';
import { IVector3D, PositionComputer } from '@holo5/roombuilder';
import { FurnitureVisualization } from './FurnitureVisualization';
import { IFurniProperty } from '../interfaces/IFurniProperty';
import { FurniData } from '../../assets-manager/FurniData';
import { Engine } from '../../../../../../engine/Engine';
import { EventCategory } from '../../../../../object/enums/EventCategory';

export class RoomBackgroundVisualization extends FurnitureVisualization {
    private _datas: string[];

    constructor(
        engine: Engine,
        furniData: FurniData,
        layerId: number,
        furniProperty: IFurniProperty,
        mapPosition: IVector3D,
        screenPosition: IVector3D,
        texturesDictionnary: any,
        index: number = 0,
        datas: string[],
    ) {
        super(engine, furniData, layerId, furniProperty, mapPosition, screenPosition, texturesDictionnary, index);

        this.eventCategory = EventCategory.NONE;
        this._datas = datas;

        if (this._datas.length === 10) {
            this.retrieveAds();
        }
    }

    retrieveAds() {
        const loader = new PIXI.Loader();
        loader.add('image', this._datas[3], { crossOrigin: true });
        loader.load((loader1, resources) => {
            this.graphic.texture = resources.image.texture;
            this.updateFromVectors(this.mapPosition, this.screenPosition);
            this.graphic.name = 'ads_background';
        });
        this.graphic.texture = PIXI.Texture.EMPTY;
    }

    protected attachAttributes() {
    }

    protected retrieveFrames() {
    }

    public getZIndex(): number {
        const screenPosition = PositionComputer.getFurniScreenPosition(this.mapPosition, this._layerId, -10000000, this._index, -parseInt(this._datas[9]));
        this.screenPosition = screenPosition;

        return screenPosition.z;
    }

    public getOffsetX(): number {
        return parseInt(this._datas[5]);
    }

    public getOffsetY(): number {
        return -this.graphic.texture.baseTexture.height + parseInt(this._datas[7]);
    }
}

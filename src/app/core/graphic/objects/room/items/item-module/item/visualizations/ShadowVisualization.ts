import { IVector3D, PositionComputer } from '@holo5/roombuilder';
import { FurnitureVisualization } from './FurnitureVisualization';
import { IFurniProperty } from '../interfaces/IFurniProperty';
import { FurniData } from '../../assets-manager/FurniData';
import { Engine } from '../../../../../../engine/Engine';

export class ShadowVisualization extends FurnitureVisualization {
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

        this.fixedAlpha = 0.2;
        this.graphic.pluginName = 'batch';
        this.graphic.alpha = 0.2;
    }

    protected retrieveFrames() {
        const textureName = `${this._furniData.className}_${this._furniData.className}_64_sd_${this._direction}_0`;
        // @ts-ignore
        this.graphic.name = textureName;
        if (this._texturesDictionnary[textureName] !== undefined) {
            this.graphic.texture = this._texturesDictionnary[textureName];
            this.graphic.renderable = true;
        } else {
            this.graphic.renderable = false;
        }
    }

    public getZIndex(): number {
        const zOffset = this.getOffsetZ();
        const screenPosition = PositionComputer.getFurniScreenPosition(this.mapPosition, this._layerId, zOffset);
        this.screenPosition = screenPosition;

        return screenPosition.z;
    }
}

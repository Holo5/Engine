import * as PIXI from 'pixi.js';
import type { Dict } from '@pixi/utils';
import { IVector3D } from '@holo5/roombuilder';
import { FurnitureVisualization } from './FurnitureVisualization';
import { VisualizationUtils } from './VisualizationUtils';
import { IFurniProperty } from '../interfaces/IFurniProperty';
import { FurniData } from '../../assets-manager/FurniData';
import { GraphicData } from '../../../../../object/cache/GraphicData';
import { Engine } from '../../../../../../engine/Engine';

export class AnimatedFurnitureVisualization extends FurnitureVisualization {
    private _textures: GraphicData[];

    constructor(
        engine: Engine,
        furniData: FurniData,
        layerId: number,
        furniProperty: IFurniProperty,
        mapPosition: IVector3D,
        screenPosition: IVector3D,
        texturesDictionnary: Dict<PIXI.Texture>,
        index: number = 0,
    ) {
        super(engine, furniData, layerId, furniProperty, mapPosition, screenPosition, texturesDictionnary, index);
        this._textures = [GraphicData.createEmpty()];

        this.retrieveFrames();
    }

    private startOrStop() {
        if (this._textures.length > 1) {
            this.start();
        } else {
            this.stop();
        }
    }

    protected retrieveFrames() {
        this._textures = [];

        this.getFrameSequence().forEach((frameId) => {
            const textureName = `${this._furniData.className}_${this._furniData.className}_64_${VisualizationUtils.toLayerName(this._layerId)}_${this._direction}_${frameId}`;
            this.graphic.name = textureName;
            if (this._texturesDictionnary[textureName] !== undefined) {
                this.engine.graphicCacheManager.requestCacheFromTexture(
                    {
                        id: textureName,
                        texture: this._texturesDictionnary[textureName],
                    },
                    (data) => {
                        this._textures.push(data);
                    },
                );
            }
        });

        this.startOrStop();
    }

    protected getFrameSequence(): number[] {
        if (Object.values(this._furniProperty.visualization.animation).length === 0) {
            return [0];
        }
        const animationId = this.getDefaultVisualizationId();

        if (this._furniProperty.visualization.animation[animationId] === undefined) return [0];

        let animationLayer = this._furniProperty.visualization.animation[animationId][this._layerId];
        if (animationLayer === undefined) {
            if (
                this._furniProperty.visualization.animation[animationId - 1] !== undefined
              && this._furniProperty.visualization.animation[animationId - 1][this._layerId] !== undefined
            ) {
                animationLayer = this._furniProperty.visualization.animation[animationId - 1][this._layerId];
            }
        } else if (animationLayer.frameRepeat !== undefined) {
            // Something here ?
        }
        if (animationLayer === undefined || animationLayer.frameSequence === undefined || animationLayer.frameSequence.length === 0) return [0];

        return animationLayer.frameSequence;
    }

    protected getDefaultVisualizationId(): number {
        if (this._state !== undefined) {
            return parseInt(this._state);
        }
        const [firstAnimationId] = Object.keys(this._furniProperty.visualization.animation);
        return parseInt(firstAnimationId);
    }

    public start() {
        this.engine.animationTicker.add(this.guid, (frame) => {
            this.setRenderableData(this._textures[frame % this._textures.length]);
        });
    }

    public stop() {
        this.engine.animationTicker.remove(this.guid);
        if (this._textures.length > 0) {
            this.setRenderableData(this._textures[0]);
        }
    }

    public updateDirection(direction: number, animated: boolean = false) {
        super.updateDirection(direction);
    }
}

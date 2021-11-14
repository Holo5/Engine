import { BLEND_MODES, Container, IPointData } from 'pixi.js';
import { IVector3D, PositionComputer } from '@holo5/roombuilder';
import { IFurniProperty } from '../interfaces/IFurniProperty';
import { VisualizationUtils } from './VisualizationUtils';
import { FurniData } from '../../assets-manager/FurniData';
import { Animation } from '../../../../../object/Animation';
import { GraphicObject } from '../../../../../object/GraphicObject';
import { GraphicData } from '../../../../../object/cache/GraphicData';
import { Engine } from '../../../../../../engine/Engine';
import { EventCategory } from '../../../../../object/enums/EventCategory';

export class FurnitureVisualization extends GraphicObject {
    public engine: Engine;

    protected _furniData: FurniData;
    protected _layerId: number;
    protected _furniProperty: IFurniProperty;
    protected _texturesDictionnary: any;
    protected _index: number;
    protected _state: string = undefined;
    protected _direction: number;
    protected _ignoreMouse: boolean;

    protected _furniPartsContainer: Container;

    constructor(
        engine: Engine,
        furniData: FurniData,
        layerId: number,
        furniProperty: IFurniProperty,
        mapPosition: IVector3D,
        screenPosition: IVector3D,
        texturesDictionnary: any,
        index: number = 0,
    ) {
        super();

        this.engine = engine;
        this.eventCategory = EventCategory.FURNI;

        this._furniData = furniData;
        this._layerId = layerId;
        this._furniProperty = furniProperty;
        this.mapPosition = mapPosition;
        this.screenPosition = screenPosition;
        this._texturesDictionnary = texturesDictionnary;
        this._index = index;
        this._direction = 2;
        this._ignoreMouse = false;

        this._furniPartsContainer = new Container();
        this.graphic.pluginName = 'batch';

        this.animation = new Animation(this);

        this.attachAttributes();
        this.retrieveFrames();
    }

    protected attachAttributes() {
        if (
            this._furniData.color !== undefined
          && this._furniProperty.visualization?.colors[this._furniData.color] !== undefined
          && this._furniProperty.visualization?.colors[this._furniData.color][this._layerId] !== undefined
        ) {
            this.graphic.tint = parseInt(this._furniProperty.visualization?.colors[this._furniData.color][this._layerId], 16);
        }

        if (this._furniProperty.visualization.layers[this._layerId]?.alpha !== undefined) {
            this.graphic.alpha = this._furniProperty.visualization.layers[this._layerId]?.alpha / 255;
        }

        if (this._furniProperty.visualization.layers[this._layerId]?.ink !== undefined) {
            if (this._furniProperty.visualization.layers[this._layerId].ink === 'ADD') {
                this.graphic.blendMode = BLEND_MODES.ADD;
            }
        }

        if (this._furniProperty.visualization.layers[this._layerId]?.ignoreMouse !== undefined) {
            this._ignoreMouse = this._furniProperty.visualization.layers[this._layerId].ignoreMouse;
        }
    }

    protected retrieveFrames(): void {
        const textureName = `${this._furniData.className}_${this._furniData.className}_64_${VisualizationUtils.toLayerName(this._layerId)}_${this._direction}_0`;
        this.graphic.name = textureName;
        if (this._texturesDictionnary[textureName] !== undefined) {
            this.engine.graphicCacheManager.requestCacheFromTexture(
                {
                    id: textureName,
                    texture: this._texturesDictionnary[textureName],
                },
                (data) => {
                    this.setRenderableData(data);
                    this.updateFromVectors(this.mapPosition, this.screenPosition);
                },
            );
        }
    }

    public setRenderableData(renderableData: GraphicData) {
        this.graphic.texture = renderableData.texture;

        this.graphic.containsPoint = (position: IPointData) => {
            if (this._ignoreMouse === true || this.graphic.renderable === false) return false;

            return renderableData.hitArea.contains(
                Math.floor(position.x - this.graphic.x - renderableData.texture.trim.x),
                Math.floor(position.y - this.graphic.y - renderableData.texture.trim.y),
            );
        };
    }

    updateDirection(direction: number) {
        this._direction = direction;
        this.retrieveFrames();
    }

    updateState(state: string) {
        this._state = state;
        this.retrieveFrames();
    }

    public getZIndex(): number {
        const zOffset = this.getOffsetZ();
        const screenPosition = PositionComputer.getFurniScreenPosition(this.mapPosition, this._layerId, zOffset, this._index);
        this.screenPosition = screenPosition;

        return screenPosition.z;
    }

    public getOffsetZ(): number {
        if (this._furniProperty.visualization?.layers[this._layerId]?.z) {
            return parseInt(this._furniProperty.visualization.layers[this._layerId].z);
        }
        return 0;
    }
}

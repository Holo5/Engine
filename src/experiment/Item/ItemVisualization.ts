import { BLEND_MODES } from 'pixi.js';
import { GraphicObject } from '../GraphicObject';
import { VisualizationUtils } from '../../app/core/graphic/objects/room/items/item-module/item/visualizations/VisualizationUtils';
import { Engine } from '../Engine';
import { Configuration } from '../../conf';

export class ItemVisualization extends GraphicObject {
    public readonly layerId: number;
    public textureFrameID: string;

    private lastCurrentFrame: number;

    public constructor(name: string, layerId: number) {
        super();

        this.textureID = name;
        this.layerId = layerId;
        this.textureFrameID = `${name}_${name}_64_${VisualizationUtils.toLayerName(layerId)}_0_0`;

        this.lastCurrentFrame = 0;

        this.sprite.position.set(100, 100);
    }

    public update(engine: Engine) {
        super.update(engine);

        if (this.layerId === 3 && this.lastCurrentFrame < engine.currentFrame) {
            this.needToUpdateTexture = true;
            this.lastCurrentFrame = engine.currentFrame;
        }

        if (this.layerId === 1) {
            this.sprite.blendMode = BLEND_MODES.ADD;
        }
    }

    protected getTextureLink(): string {
        return `${Configuration.images.furnitureDomain}/${this.textureID}/${this.textureID}.json`;
    }

    protected updateTexture(engine: Engine) {
        const resource = engine.resourceManager.get(this.textureID);
        this.textureFrameID = `${this.textureID}_${this.textureID}_64_${VisualizationUtils.toLayerName(this.layerId)}_0_${this.lastCurrentFrame % 4}`;

        this.sprite.texture = resource.textures[this.textureFrameID];
        this.needToUpdateTexture = false;
    }
}

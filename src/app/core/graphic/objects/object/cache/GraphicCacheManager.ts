import { DisplayObject, Rectangle, Sprite, Texture } from 'pixi.js';
import { Memento, Request } from 'mementojs';
import { GraphicTransformer } from '../../../engine/utils/GraphicTransformer';
import { GraphicData } from './GraphicData';

interface DisplayableObject {
    id: string,
    object: DisplayObject,
    region?: Rectangle,
}

interface TextureObject {
    id: string,
    texture: Texture
}

interface DisplayObjectDictionnary {
    [id: string]: {
        object: DisplayObject
        region?: Rectangle,
        trim?: Rectangle
    }
}

export class GraphicCacheManager extends Memento<GraphicData> {
    private _graphicTransformer: GraphicTransformer;
    private _objectDictionnary: DisplayObjectDictionnary;

    constructor(graphicTransformer: GraphicTransformer) {
        super();
        this._graphicTransformer = graphicTransformer;
        this._objectDictionnary = {};
    }

    public requestCache(displayObject: DisplayableObject, callback: (data: GraphicData) => void) {
        this._objectDictionnary[displayObject.id] = {
            object: displayObject.object,
            region: displayObject.region,
        };
        this.request(displayObject.id, callback);
    }

    public requestCacheFromTexture(textureObject: TextureObject, callback: (data: GraphicData) => void) {
        if (this._objectDictionnary[textureObject.id] === undefined) {
            this._objectDictionnary[textureObject.id] = {
                object: new Sprite(textureObject.texture),
                region: textureObject.texture.trim,
                trim: textureObject.texture.trim,
            };
        }
        this.request(textureObject.id, callback);
    }

    public request(id: string, callback: (data: GraphicData) => void) {
        super.request(id, callback);
    }

    public load(id: string, request: Request<GraphicData>) {
        const renderableData = this._graphicTransformer.createRenderableData(this._objectDictionnary[id].object, this._objectDictionnary[id].region);

        if (this._objectDictionnary[id].trim !== undefined) {
            renderableData.texture.trim = this._objectDictionnary[id].trim;
            renderableData.texture.updateUvs();
        }

        request.setData(renderableData);
    }
}

import * as PIXI from 'pixi.js';
import { GraphicTransformer } from '../../engine/utils/GraphicTransformer';
import { GraphicData } from './cache/GraphicData';
import { Ticker } from '../../engine/ticker/Ticker';
import { GraphicObject } from './GraphicObject';

interface ITextureDictionnary {
    [id: string]: GraphicData
}

export abstract class AnimatedGraphicObject extends GraphicObject {
    protected _ticker: Ticker;
    protected _graphicTransformer: GraphicTransformer;
    protected _textureDictionnary: ITextureDictionnary;
    protected _currentFrame: number;

    constructor(ticker: Ticker, graphicTransformer: GraphicTransformer) {
        super();

        this._ticker = ticker;
        this._graphicTransformer = graphicTransformer;
        this._textureDictionnary = {};
        this._currentFrame = 0;

        this._ticker.add(this.guid, (frame) => this.tick(frame));
    }

    private tick(frame: number) {
        this._currentFrame = frame;
        this.render();
    }

    protected render() {
    }

    protected updateRenderableData(id: string, object: PIXI.DisplayObject) {
        if (this._textureDictionnary[id] !== undefined) {
            this.setRenderableData(this._textureDictionnary[id]);
        } else {
            const renderableData = this._graphicTransformer.createRenderableData(object, object.getBounds());
            this._textureDictionnary[id] = renderableData;

            this.setRenderableData(renderableData);
        }
    }

    public dispose() {
        this._ticker.remove(this.guid);
        super.dispose();
    }

    attachGraphicTransformer(graphicTransformer: GraphicTransformer) {
        this._graphicTransformer = graphicTransformer;
    }
}

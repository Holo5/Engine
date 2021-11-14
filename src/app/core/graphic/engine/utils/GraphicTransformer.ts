import { Renderer, AbstractRenderer, Rectangle, DisplayObject, Texture, Sprite, SCALE_MODES } from 'pixi.js';
import { RenderableHitArea } from '../../objects/object/cache/RenderableHitArea';
import { GraphicData } from '../../objects/object/cache/GraphicData';

export class GraphicTransformer {
    private _renderer: Renderer;

    init(renderer: Renderer | AbstractRenderer) {
        this._renderer = renderer as Renderer;
    }

    public createRenderableData(object: DisplayObject, region?: Rectangle): GraphicData {
        const renderTexture = this._renderer.generateTexture(object, {
            region,
            resolution: 1,
            scaleMode: SCALE_MODES.NEAREST,
        });
        const pixels = this._renderer.plugins.extract.pixels(renderTexture);

        const hitArea = new RenderableHitArea(0, 0, renderTexture.width, renderTexture.height, pixels);
        return new GraphicData(renderTexture, hitArea);
    }

    public createRenderableWithoutHitArea(object: DisplayObject, region?: Rectangle): GraphicData {
        const renderTexture = this._renderer.generateTexture(object, {
            region,
            resolution: 1,
            scaleMode: SCALE_MODES.NEAREST,
        });

        const hitArea = new RenderableHitArea(0, 0, renderTexture.width, renderTexture.height, new Uint8Array());
        return new GraphicData(renderTexture, hitArea);
    }

    public generateBase64(container: Texture) {
        return this._renderer.plugins.extract.base64(new Sprite(container), 'image/png');
    }
}

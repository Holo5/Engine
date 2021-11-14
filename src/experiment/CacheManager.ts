import { AbstractRenderer, RenderTexture, Sprite } from 'pixi.js';

export class CacheManager {
    public renderer: AbstractRenderer;
    private cachedRenderTexture: { [id: string]: RenderTexture };

    public constructor(renderer: AbstractRenderer) {
        this.renderer = renderer;
        this.cachedRenderTexture = {};
    }

    public has(id: string): boolean {
        return this.cachedRenderTexture[id] !== undefined;
    }

    public get(id: string): RenderTexture {
        return this.cachedRenderTexture[id];
    }

    public generate(id: string, sprite: Sprite): void {
        const renderTexture = RenderTexture.create({ width: sprite.texture.width, height: sprite.texture.height });
        this.renderer.render(sprite, { renderTexture });

        // @ts-ignore
        this.cachedRenderTexture[id] = renderTexture;
    }
}

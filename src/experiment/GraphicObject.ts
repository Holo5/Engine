import { Sprite, Texture, RenderTexture } from 'pixi.js';
import { IVector3D } from '@holo5/roombuilder';
import { Engine } from './Engine';
import { IObject } from './interface/IObject';

export class GraphicObject implements IObject {
    public readonly sprite: Sprite;
    public textureID: string;

    public mapPosition: IVector3D;
    public screenPosition: IVector3D;

    protected needToUpdateTexture: boolean;
    protected needToUpdatePosition: boolean;

    private isDisposed: boolean;
    private isDisposing: boolean;

    public constructor() {
        this.sprite = new Sprite(Texture.EMPTY);

        this.isDisposed = false;
        this.isDisposing = false;
        this.needToUpdateTexture = true;
        this.needToUpdatePosition = false;
    }

    public update(engine: Engine): void {
        const textureLink = this.getTextureLink();

        if (textureLink === null) return;

        if (!engine.resourceManager.has(this.textureID, textureLink)) return;

        if (this.sprite.parent === null) {
            engine.stage.addChild(this.sprite);
        }

        if (this.isDisposing) this.disposing(engine);

        if (this.needToUpdateTexture) this.updateTexture(engine);

        if (this.needToUpdatePosition) this.updateGraphicPositions();
    }

    public needUpdate(): boolean {
        return true;
    }

    public updatePositions(mapPosition: IVector3D, screenPosition: IVector3D): void {
        this.mapPosition = mapPosition;
        this.screenPosition = screenPosition;
        this.needToUpdatePosition = true;
    }

    protected updateGraphicPositions() {
        this.sprite.position.set(this.screenPosition.x, this.screenPosition.y);
        this.needToUpdatePosition = false;
    }

    protected getTextureLink(): string {
        return null;
    }

    protected disposing(engine: Engine) {
        if (this.sprite.parent !== null) {
            engine.stage.removeChild(this.sprite);
            this.sprite.destroy({ children: true });
            this.isDisposed = true;
        }
    }

    protected updateTexture(engine: Engine) {
        this.needToUpdateTexture = false;
    }
}

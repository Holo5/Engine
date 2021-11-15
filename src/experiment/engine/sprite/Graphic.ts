import { AssetsManager } from '../assets/AssetsManager';
import { BaseTexture, Point, Rectangle, Sprite, Texture } from 'pixi.js';
import { EventCategory } from './enum/EventCategory';
import { ICurrentEvents } from '../events/interface/ICurrentEvents';
import { IGraphic } from './interface/IGraphic';
import { ITween } from './tween/interface/ITween';
import { IVector3D, Vector3d } from '@holo5/roombuilder';
import { Tween } from './tween/Tween';

export class Graphic extends Sprite implements IGraphic {
    public currentPosition: IVector3D;
    public bounds: Rectangle;
    public name: string;

    protected isInited: boolean;
    protected positionUpdate: boolean;

    private tween: ITween;

    constructor(texture?: Texture) {
        super(texture ?? Texture.EMPTY);

        this.visible = false;

        this.currentPosition = new Vector3d();
        this.name = '';
        this.isInited = false;
    }

    public needInit() {
        return !this.isInited;
    }

    public needFrameUpdate(): boolean {
        return false;
    }

    public needPositionUpdate(): boolean {
        return this.positionUpdate;
    }

    public updateInit(resourceManager: AssetsManager): void {
        if (this.getTextureLink() === null) return;

        if (resourceManager.has(this.name, this.getTextureLink())) {
            this.texture = resourceManager.get(this.name).texture;
            this.updateBounds();
            this.generateHitMap();
            this.isInited = true;
        }
    }

    public needUpdate(): boolean {
        return this.tween !== undefined && !this.tween.complete;
    }

    protected getTextureLink(): string {
        return null;
    }

    public dispose(): void {
    }

    public updateBounds(): void {
        this.bounds = new Rectangle(this.position.x, this.position.y, this.texture.width, this.texture.height);
    }

    public updateFrame(): void {
    }

    public updatePosition(stageOffset: Point): void {
        this.position.set(stageOffset.x + this.currentPosition.x, stageOffset.y + this.currentPosition.y);
        this.zIndex = this.currentPosition.z;
        this.positionUpdate = false;
        this.updateBounds();
    }

    public update(now: number): void {
        this.tween.update(now);
    }

    public addTween(tween: Tween) {
        this.tween = tween;
    }

    public checkBounds(bounds: Rectangle): void {
        this.visible = !!(bounds.contains(this.bounds.x, this.bounds.y) || bounds.contains(this.bounds.x + this.bounds.width,
            this.bounds.y + this.bounds.height));
    }

    public checkEvents(currentEvents: ICurrentEvents): boolean {
        if (!this.bounds) return false;

        if (!this.bounds.contains(currentEvents.currentCursor.x, currentEvents.currentCursor.y)) return false;

        if (this.bounds.width < 2 || this.bounds.height < 2) return false;

        // @ts-ignore
        if (!this.texture.baseTexture.hitMap) this.generateHitMap();

        let point = new Point(currentEvents.currentCursor.x - this.bounds.x, currentEvents.currentCursor.y - this.bounds.y);

        // @ts-ignore
        return this.texture.baseTexture.hitMap[point.y * this.texture.baseTexture.width + point.x] > 0;
    }

    protected generateHitMap(baseTexture?: BaseTexture): void {
        let baseTex = baseTexture || this.texture.baseTexture;
        // @ts-ignore
        if (baseTex.hitMap !== undefined) return;
        if (!baseTex.resource) return;

        let canvas = null;
        let context = null;
        //@ts-ignore
        if (baseTex.resource.source instanceof Image) {
            canvas = document.createElement('canvas');
            context = canvas.getContext('2d');

            // @ts-ignore
            canvas.width = baseTex.resource.source.width;
            // @ts-ignore
            canvas.height = baseTex.resource.source.height;
            // @ts-ignore
            context.drawImage(baseTex.resource.source, 0, 0);
        } else {
            // @ts-ignore
            canvas = baseTex.resource.source;
            context = canvas.getContext('2d');
        }

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        const hitMap = new Uint32Array(canvas.width * canvas.height);

        for (let i = 0; i < canvas.width * canvas.height; i++) {
            hitMap[i] = imageData.data[i * 4 + 3];
        }

        // @ts-ignore
        baseTex.hitMap = hitMap;
    }

    public setPosition(position: IVector3D): void {
        this.currentPosition = position;
        this.positionUpdate = true;
    }

    public getEventCategory(): EventCategory {
        return EventCategory.NONE;
    }
}

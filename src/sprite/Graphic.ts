import { AssetsManager } from '../assets/AssetsManager';
import { BaseTexture, Point, Rectangle, Sprite, Texture } from 'pixi.js';
import { EventCategory } from './enum/EventCategory';
import { ICurrentEvents } from '../events/interface/ICurrentEvents';
import { IGraphic } from './interface/IGraphic';
import { ITween } from './tween/interface/ITween';
import { IVector3D, Vector3d } from '@holo5/roombuilder';
import { Tween } from './tween/Tween';

export class Graphic extends Sprite implements IGraphic {
    public name: string;

    private _currentPosition: IVector3D;
    private bounds: Rectangle;
    private initialized: boolean;
    private positionUpdated: boolean;
    private frameUpdated: boolean;
    private tween: ITween;

    constructor(texture?: Texture) {
        // (PIXI) By default, set an empty texture
        super(texture ?? Texture.EMPTY);
        // (PIXI) By default, the renderer don't need to display this shit !
        this.visible = false;

        this.name = '';

        this._currentPosition = new Vector3d();
        this.bounds = new Rectangle();
        this.initialized = false;
        this.positionUpdated = true;
        this.frameUpdated = true;
    }

    public needInitialization() {
        return !this.initialized;
    }

    setInitialized(): void {
        this.initialized = true;
    }

    requestInitialization(): void {
        this.initialized = false;
    }

    public initialize(resourceManager: AssetsManager): void {
        if (this.getTextureLink() === null) return;

        if (resourceManager.has(this.name, this.getTextureLink())) {
            this.texture = resourceManager.get(this.name).texture;
            this.updateBounds();
            this.generateHitMap();

            this.setInitialized();
        }
    }

    public needFrameUpdate(): boolean {
        return !this.frameUpdated;
    }

    setFrameUpdated(): void {
        this.frameUpdated = true;
    }

    requestFrameUpdate(): void {
        this.frameUpdated = false;
    }

    public updateFrame(): void {
        // Do nothing here, no need to update frame
        this.setFrameUpdated();
    }

    needTweenUpdate(): boolean {
        return this.tween !== undefined && !this.tween.complete;
    }

    updateTween(now: number): void {
        this.tween.update(now);
    }

    public addTween(tween: Tween) {
        this.tween = tween;
    }

    setPositionUpdated(): void {
        this.positionUpdated = true;
    }

    requestPositionUpdate(): void {
        this.positionUpdated = false;
    }

    public needPositionUpdate(): boolean {
        return !this.positionUpdated;
    }

    public setPosition(position: IVector3D): void {
        this._currentPosition = position;
        this.requestPositionUpdate();
    }

    public updatePosition(stageOffset: Point): void {
        this.position.set(stageOffset.x + this._currentPosition.x, stageOffset.y + this._currentPosition.y);
        this.zIndex = this._currentPosition.z;
        this.setPositionUpdated();
        this.updateBounds();
    }

    getBounds() {
        return this.bounds;
    }

    getCurrentPosition(): IVector3D {
        return this._currentPosition;
    }


    protected getTextureLink(): string {
        return null;
    }

    public updateBounds(): void {
        this.bounds = new Rectangle(this.position.x, this.position.y, this.texture.width, this.texture.height);
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

        let canvas, context;
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

    public getEventCategory(): EventCategory {
        return EventCategory.NONE;
    }

    public dispose(): void {
    }

    get currentPosition(): IVector3D {
        return this._currentPosition;
    }
}

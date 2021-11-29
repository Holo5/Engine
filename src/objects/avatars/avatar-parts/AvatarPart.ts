import { AssetsManager } from '../../../assets/AssetsManager';
import { AvatarPosture } from '../enums/AvatarPosture';
import { Configuration } from '../../../../example/conf';
import { ExpandedFigureDataPart } from '../figure-data-manager/ExpandedFigureDataPart';
import { Graphic } from '../../../sprite/Graphic';
import { LoaderResource, Texture } from 'pixi.js';

export class AvatarPart extends Graphic {
    public textures: Texture[];
    public currentTextureName: string;

    private needFrameChange: boolean;
    private action: string;
    private direction: number;
    private currentTextureIndex: number;
    private resource: LoaderResource;

    constructor(
        public expandedFigureDataPart: ExpandedFigureDataPart,
    ) {
        super(Texture.WHITE);

        this.needFrameChange = false;
        this.direction = 2;
        this.action = AvatarPosture.POSTURE_STAND;

        if (this.expandedFigureDataPart.color !== false && this.expandedFigureDataPart.type !== 'ey') {
            this.tint = parseInt(`0x${this.expandedFigureDataPart.color}`);
        }

        if (expandedFigureDataPart.type === 'sd') this.alpha = 0.3;
        if (!expandedFigureDataPart.defaultVisible) this.visible = false;
    }

    public updateInit(resourceManager: AssetsManager): void {
        if (this.getTextureLink() === null) return;

        if (!resourceManager.has(this.expandedFigureDataPart.assetName, this.getTextureLink())) return;

        this.resource = resourceManager.get(this.expandedFigureDataPart.assetName);
        if (this.resource.spritesheet === undefined || this.resource.spritesheet.animations === undefined) return;

        this.needFrameChange = true;
        this.updateBounds();
        this.isInited = true;
    }

    public needFrameUpdate(): boolean {
        return this.needFrameChange;
    }

    public updateFrame() {
        this.updateAction(this.action, this.direction);
        this.needFrameChange = false;
    }

    updateAction(action: string, direction?: number, fixFrame: number | false = false) {
        this.action = action;

        const finalDirection = direction !== undefined ? direction : this.direction;
        this.currentTextureName = `${this.expandedFigureDataPart.type}_${this.expandedFigureDataPart.id}_${action}_${finalDirection}`;
        if (this.resource?.spritesheet?.animations[this.currentTextureName] !== undefined
          && this.resource?.spritesheet?.animations[this.currentTextureName][0] !== undefined) {
            this.texture = this.resource.spritesheet.animations[this.currentTextureName][0];
            this.visible = true;
        } else if (direction === 0 || direction === 6 || direction === 7 || action === AvatarPosture.POSTURE_LAY) this.visible = false;

        if (fixFrame !== false) {
            this.texture = this.textures[fixFrame];
        }

        this.direction = finalDirection;
    }

    updateDirection(direction: number) {
        this.needFrameChange = true;
    }

    updateExpandedFigureDataPart(expandedFigureDataPart: ExpandedFigureDataPart) {
        this.expandedFigureDataPart = expandedFigureDataPart;
        this.updateAction(this.action);
    }

    protected getTextureLink(): string {
        return `${Configuration.images.figureDomain}${this.expandedFigureDataPart.assetName}/${this.expandedFigureDataPart.assetName}.json`;
    }

    getType() {
        return this.expandedFigureDataPart.type;
    }
}

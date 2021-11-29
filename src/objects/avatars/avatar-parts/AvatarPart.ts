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
    private fixFrame: number | false;
    private currentTextureIndex: number;
    private resource: LoaderResource;

    constructor(
        public expandedFigureDataPart: ExpandedFigureDataPart,
    ) {
        super(Texture.WHITE);

        this.needFrameChange = false;
        this.direction = 2;
        this.action = AvatarPosture.POSTURE_STAND;
        this.fixFrame = false;

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

        this.visible = false;
        this.needFrameChange = true;
        this.updateBounds();
        this.isInited = true;
    }

    public needFrameUpdate(): boolean {
        return this.needFrameChange;
    }

    public updateFrame() {
        this.currentTextureName = `${this.expandedFigureDataPart.type}_${this.expandedFigureDataPart.id}_${this.action}_${this.direction}`;
        if (this.resource?.spritesheet?.animations[this.currentTextureName] !== undefined
          && this.resource?.spritesheet?.animations[this.currentTextureName][0] !== undefined) {
            this.texture = this.resource.spritesheet.animations[this.currentTextureName][0];
            this.visible = true;
        } else if (this.direction === 0 || this.direction === 6 || this.direction === 7 || this.action === AvatarPosture.POSTURE_LAY) this.visible = false;

        if (this.fixFrame !== false) {
            this.texture = this.textures[this.fixFrame];
        }

        this.needFrameChange = false;
    }

    updateAction(action: string, direction?: number, fixFrame: number | false = false) {
        this.action = action;
        this.direction = direction ?? this.direction;
        this.fixFrame = fixFrame;

        this.needFrameChange = true;
    }

    updateDirection(direction: number) {
        this.direction = direction;
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

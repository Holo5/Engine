import { AssetsManager } from '../../../assets/AssetsManager';
import { AvatarPosture } from '../enums/AvatarPosture';
import { Configuration } from '../../../../example/conf';
import { ExpandedFigureDataPart } from '../figure-data-manager/ExpandedFigureDataPart';
import { Graphic } from '../../../sprite/Graphic';
import { LoaderResource, Texture } from 'pixi.js';

export class AvatarPart extends Graphic {
    public textures: Texture[];
    public currentTextureName: string;

    private action: string;
    private direction: number;
    private fixedFrame: number | false;
    private resource: LoaderResource;
    private needToFindNewTextures: boolean;

    constructor(
        public expandedFigureDataPart: ExpandedFigureDataPart,
    ) {
        super(Texture.EMPTY);

        this.direction = expandedFigureDataPart.defaultDirection;
        this.action = AvatarPosture.POSTURE_STAND;
        this.fixedFrame = false;

        this.needToFindNewTextures = true;

        if (
            this.expandedFigureDataPart.color !== false &&
            this.expandedFigureDataPart.type !== 'ey'
        ) {
            this.tint = parseInt(`0x${this.expandedFigureDataPart.color}`);
        }

        if (expandedFigureDataPart.type === 'sd') {
            this.alpha = 0.3;
            this.fixedFrame = 0;
        } // TODO add shadow
        if (!expandedFigureDataPart.defaultVisible) this.visible = false;
    }

    public initialize(resourceManager: AssetsManager): void {
        if (this.getTextureLink() === null) return;

        if (!resourceManager.has(this.expandedFigureDataPart.assetName, this.getTextureLink())) return;

        this.resource = resourceManager.get(this.expandedFigureDataPart.assetName);
        if (this.resource.spritesheet === undefined || this.resource.spritesheet.animations === undefined) return;

        this.visible = false;
        this.requestToFindNewTexture();
        this.updateBounds();
        this.setInitialized();
    }

    public findTextures() {
        this.currentTextureName = `${this.expandedFigureDataPart.type}_${this.expandedFigureDataPart.id}_${this.action}_${this.direction}`;
        console.log(this.currentTextureName);
        if (this.resource?.spritesheet?.animations[this.currentTextureName] !== undefined
            && this.resource?.spritesheet?.animations[this.currentTextureName][0] !== undefined) {
            this.textures = this.resource.spritesheet.animations[this.currentTextureName];
            this.visible = true;
        } else if (this.direction === 0 || this.direction === 6 || this.direction === 7 || this.action === AvatarPosture.POSTURE_LAY) this.visible = false;
    }

    public updateFrame(frameCount: number = 0) {
        if (this.needToFindNewTextures) {
            this.findTextures();
            this.needToFindNewTextures = false;
        }

        if (!this.visible) return;

        if (this.fixedFrame !== false) {
            this.texture = this.textures[this.fixedFrame];
            this.setFrameUpdated();
        } else {
            this.texture = this.textures[frameCount % this.textures.length];
            this.requestFrameUpdate();
        }
    }

    requestToFindNewTexture() {
        this.needToFindNewTextures = true;
        this.requestFrameUpdate();
    }

    updateAction(action: string, direction?: number, fixedFrame: number | false = false) {
        this.action = action;
        this.direction = direction ?? this.direction;
        this.fixedFrame = fixedFrame;
        this.requestToFindNewTexture();
    }

    updateDirection(direction: number) {
        if (this.getType() === 'sd' && this.action != AvatarPosture.POSTURE_SIT) return;

        this.direction = direction;
        this.requestToFindNewTexture();
    }

    protected getTextureLink(): string {
        return `${Configuration.images.figureDomain}${this.expandedFigureDataPart.assetName}/${this.expandedFigureDataPart.assetName}.json`;
    }

    getType() {
        return this.expandedFigureDataPart.type;
    }
}

import { AssetsManager } from '../../../assets/AssetsManager';
import { AvatarGesture } from '../enums/AvatarGesture';
import { AvatarPosture } from '../enums/AvatarPosture';
import { Configuration } from '../../../../../conf';
import { ExpandedFigureDataPart } from '../figure-data-manager/ExpandedFigureDataPart';
import { Graphic } from '../../../sprite/Graphic';
import { LoaderResource, Texture } from 'pixi.js';

export class AvatarPart extends Graphic {
    public textures: Texture[];
    public currentTextureName: string;

    private needFrameChange: boolean;
    private currentAction: string;
    private direction: number;
    private gesture: AvatarGesture | string;
    private posture: AvatarPosture;
    private currentTextureIndex: number;
    private resource: LoaderResource;

    constructor(
        public expandedFigureDataPart: ExpandedFigureDataPart,
    ) {
        super(Texture.EMPTY);

        this.needFrameChange = false;
        this.direction = 2;
        this.gesture = AvatarGesture.GESTURE_STAND;
        this.posture = AvatarPosture.POSTURE_STAND;

        if (this.expandedFigureDataPart.color !== false && this.expandedFigureDataPart.type !== 'ey') {
            this.tint = parseInt(`0x${this.expandedFigureDataPart.color}`);
        }

        if (expandedFigureDataPart.type === 'sd') this.alpha = 0.3;
        if (!expandedFigureDataPart.defaultVisible) this.visible = false;
    }

    public updateInit(resourceManager: AssetsManager): void {
        if (this.getTextureLink() === null) return;

        if (resourceManager.has(this.expandedFigureDataPart.assetName, this.getTextureLink())) {
            this.resource = resourceManager.get(this.expandedFigureDataPart.assetName);
            if (this.resource.spritesheet === undefined || this.resource.spritesheet.animations === undefined) return;

            this.needFrameChange = true;
            this.updateBounds();
            this.isInited = true;
        }
    }

    protected getTextureLink(): string {
        return `${Configuration.images.figureDomain}${this.expandedFigureDataPart.assetName}/${this.expandedFigureDataPart.assetName}.json`;
    }

    public updateFrameCount(frameNumber: number) {
        this.currentTextureIndex = frameNumber % this.textures.length;
        this.texture = this.textures[this.currentTextureIndex];
    }

    public needFrameUpdate(): boolean {
        return this.textures.length > 0 || this.needFrameChange;
    }

    public updateFrame() {
        console.log(this.needFrameChange);

        this.needFrameChange = false;
        // this.texture = this.textures[0];
    }

    updateGesture(gesture: AvatarGesture | string, direction?: number) {
        this.gesture = gesture;
        this.updateAction(gesture, direction);

        this.needFrameChange = true;
    }

    updatePosture(posture: AvatarPosture, direction?: number) {
        if (this.expandedFigureDataPart.type === 'sd' && posture !== AvatarPosture.POSTURE_SIT) {
            this.posture = AvatarPosture.POSTURE_STAND;
            this.updateAction(AvatarPosture.POSTURE_STAND, 0);
        } else if (this.resource.data.partsType[this.getType()]?.gestures.indexOf(posture) !== -1) {
            this.posture = posture;
            this.updateAction(posture, direction);
        } else {
            this.updateDirection(direction);
        }

        this.needFrameChange = true;
    }

    updateDirection(direction: number) {
        if (direction === this.direction) return;

        if (this.gesture !== AvatarGesture.GESTURE_STAND) {
            this.updateAction(this.gesture, direction);
        } else {
            this.updateAction(this.posture, direction);
        }

        this.needFrameChange = true;
    }

    public updateAction(action: string, direction?: number, fixFrame: number | false = false) {
        this.currentAction = action;

        const finalDirection = direction !== undefined ? direction : this.direction;
        this.currentTextureName = `${this.expandedFigureDataPart.type}_${this.expandedFigureDataPart.id}_${action}_${finalDirection}`;
        if (this.resource?.spritesheet?.animations[this.currentTextureName] !== undefined
            && this.resource?.spritesheet?.animations[this.currentTextureName][0] !== undefined) {
            this.textures = this.resource.spritesheet.animations[this.currentTextureName];
            this.visible = true;
        } else if (direction === 0 || direction === 6 || direction === 7 || action === AvatarPosture.POSTURE_LAY) this.visible = false;

        if (fixFrame !== false) {
            this.texture = this.textures[fixFrame];
        }

        this.direction = finalDirection;
    }

    getType() {
        return this.expandedFigureDataPart.type;
    }

    updateExpandedFigureDataPart(expandedFigureDataPart: ExpandedFigureDataPart) {
        this.expandedFigureDataPart = expandedFigureDataPart;
        this.updateAction(this.currentAction);
    }
}

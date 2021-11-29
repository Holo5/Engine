import { AssetsManager } from '../../../assets/AssetsManager';
import { AvatarGesture } from '../enums/AvatarGesture';
import { AvatarPosture } from '../enums/AvatarPosture';
import { Configuration } from '../../../../example/conf';
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
    }

    public updateInit(resourceManager: AssetsManager): void {
        if (this.getTextureLink() === null) return;

        console.log('OK ?');

        if (resourceManager.has(this.expandedFigureDataPart.assetName, this.getTextureLink())) {
            this.resource = resourceManager.get(this.expandedFigureDataPart.assetName);
            if (this.resource.spritesheet === undefined || this.resource.spritesheet.animations === undefined) return;

            this.needFrameChange = true;
            this.updateBounds();
            this.isInited = true;
        }
    }

    updateAction(action: string, direction?: number) {

    }

    updateDirection(direction: number) {
        this.needFrameChange = true;
    }

    updateExpandedFigureDataPart(expandedFigureDataPart: ExpandedFigureDataPart) {
        this.expandedFigureDataPart = expandedFigureDataPart;
        this.updateAction(this.currentAction);
    }

    protected getTextureLink(): string {
        return `${Configuration.images.figureDomain}${this.expandedFigureDataPart.assetName}/${this.expandedFigureDataPart.assetName}.json`;
    }

    getType() {
        return this.expandedFigureDataPart.type;
    }
}

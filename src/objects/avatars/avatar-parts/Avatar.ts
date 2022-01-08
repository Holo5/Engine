import { AssetsManager } from '../../../assets/AssetsManager';
import { AvatarGesture } from '../enums/AvatarGesture';
import { AvatarPart } from './AvatarPart';
import { AvatarPartsContainer } from './AvatarPartsContainer';
import { AvatarPartsSets } from './AvatarPartsSets';
import { AvatarPosture } from '../enums/AvatarPosture';
import { Engine } from '../../../Engine';
import { ExpandedFigureDataPart } from '../figure-data-manager/ExpandedFigureDataPart';
import { GeometryData } from '../figure-data-manager/geometry/GeometryData';
import { GeometryManager } from '../figure-data-manager/geometry/GeometryManager';
import { Graphic } from '../../../sprite/Graphic';
import { IVector3D } from '@holo5/roombuilder';
import { Rectangle, RenderTexture, Renderer } from 'pixi.js';

export class Avatar extends Graphic {

    public currentDirection: number = 2;
    public currentDirectionOriginal: number = 2;
    public currentGesture: AvatarGesture = AvatarGesture.GESTURE_STAND;
    public currentPosture: AvatarPosture = AvatarPosture.POSTURE_STAND;
    public currentRightItemId: string;
    public currentLeftItemId: string;

    private avatarPartSets: AvatarPartsSets;
    private avatarPartsContainer: AvatarPartsContainer;
    private frameCount: number = 0;
    private renderer: Renderer;

    private textures: { [id: string]: RenderTexture };

    constructor(
        public engine: Engine,
        geometryManager: GeometryManager,
    ) {
        super();

        this.avatarPartSets = new AvatarPartsSets(geometryManager, this);
        this.avatarPartsContainer = new AvatarPartsContainer();
        this.frameCount = 0;
        this.textures = {};

        this.anchor.set(0.5, 1);
        this.updateDirection(this.currentDirection);
    }

    setRenderer(renderer: Renderer) {
        this.renderer = renderer;
    }

    loadExpandedFigureDataParts(...expandedFigureDataParts: ExpandedFigureDataPart[]) {
        expandedFigureDataParts.forEach((expandedFigureDataPart) => {
            const avatarPart = new AvatarPart(expandedFigureDataPart);
            this.addAvatarPart(avatarPart);
        });

        this.avatarPartsContainer.children.sort((a, b) => {
            return a.zIndex - b.zIndex;
        });
    }

    addAvatarPart(avatarPart: AvatarPart) {
        avatarPart.updateDirection(this.currentDirection);
        this.avatarPartSets.setCurrentAction(avatarPart);
        this.avatarPartSets.setCurrentZIndex(avatarPart, this.currentPosture, this.currentDirection);

        this.avatarPartsContainer.addChild(avatarPart);
    }

    updateAllAvatarParts() {
        this.avatarPartsContainer.children.forEach((avatarPart: AvatarPart) => {
            this.avatarPartSets.setCurrentZIndex(avatarPart, this.currentPosture, this.currentDirection);
            this.avatarPartSets.setCurrentAction(avatarPart);
        });
    }

    updateLeftItem(itemId: string | false) {
        this.currentLeftItemId = itemId !== false ? itemId : undefined;
        this.updateAllAvatarParts();
        return this;
    }

    updateRightItem(itemId: string | false) {
        this.currentRightItemId = itemId !== false ? itemId : undefined;
        this.updateAllAvatarParts();
    }

    updateGesture(gesture: AvatarGesture) {
        this.currentGesture = gesture;
        this.updateAllAvatarParts();
    }

    updatePosture(posture: AvatarPosture) {
        if (posture === this.currentPosture) return;

        this.currentPosture = posture;
        this.updateAllAvatarParts();
    }

    updateDirection(direction: number) {
        if (direction === this.currentDirectionOriginal) return;

        const directionIndex = GeometryData.reversedDirection.indexOf(direction);

        this.scale.x = directionIndex !== -1 ? -1 : 1;
        this.currentDirection = GeometryData.normalDirection[directionIndex] !== undefined ? GeometryData.normalDirection[directionIndex] : direction;
        this.currentDirectionOriginal = direction;

        this.updateAllAvatarParts();
    }

    needInitialization(): boolean {
        return this.avatarPartsContainer.children.find(this.checkInitialized) !== undefined;

    }

    checkInitialized(avatarPart: AvatarPart) {
        return avatarPart.needInitialization();
    }

    initialize(resourceManager: AssetsManager) {
        this.avatarPartsContainer.children.forEach((avatarPart) => {
            avatarPart.initialize(resourceManager);
        });
    }

    setPosition(position: IVector3D) {
        super.setPosition(position);
    }

    needFrameUpdate(): boolean {
        return true;
    }

    updateFrame() {
        this.frameCount++;
        this.avatarPartsContainer.children.forEach((avatarPart) => {
            avatarPart.updateFrame(this.frameCount);
        });

        if (this.frameCount > 3) this.frameCount = 0;

        if (this.renderer === undefined) return;

        let textName = this.currentPosture + this.currentGesture + this.currentDirection + this.frameCount;

        if (this.textures[textName] === undefined) {
            this.textures[textName] = this.renderer.generateTexture(this.avatarPartsContainer, {
                region: this.getTextureRegion(),
            });

            console.log(this.getTextureRegion());
        }

        this.texture = this.textures[textName];
    }

    private getTextureRegion() {
        if (this.currentPosture === AvatarPosture.POSTURE_LAY) {
            return new Rectangle(-8, -128, 80, 128);
        }

        return new Rectangle(-13, -115, 90, 130);
    }
}

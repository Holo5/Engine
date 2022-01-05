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

export class Avatar extends Graphic {

    public currentDirection: number = 2;
    public currentDirectionOriginal: number = 2;
    public currentGesture: AvatarGesture = AvatarGesture.GESTURE_STAND;
    public currentPosture: AvatarPosture = AvatarPosture.POSTURE_STAND;
    public currentRightItemId: string;
    public currentLeftItemId: string;

    private avatarPartSets: AvatarPartsSets;
    public avatarPartsContainer: AvatarPartsContainer;

    public avatarParts: AvatarPart[];

    constructor(
        public engine: Engine,
        geometryManager: GeometryManager,
    ) {
        super();

        this.avatarPartSets = new AvatarPartsSets(geometryManager, this);
        this.avatarPartsContainer = new AvatarPartsContainer();

        this.anchor.set(0.5, 1);
        this.updateDirection(this.currentDirection);

        this.avatarParts = [];
    }

    loadExpandedFigureDataParts(...expandedFigureDataParts: ExpandedFigureDataPart[]) {
        expandedFigureDataParts.forEach((expandedFigureDataPart) => {
            const avatarPart = new AvatarPart(expandedFigureDataPart);
            this.addAvatarPart(avatarPart);
        });

        this.avatarParts = this.avatarParts.sort((a, b) => {
            return a.zIndex - b.zIndex;
        });
    }

    addAvatarPart(avatarPart: AvatarPart) {
        avatarPart.updateDirection(this.currentDirection);
        this.avatarPartSets.setCurrentAction(avatarPart);
        this.avatarPartSets.setCurrentZIndex(avatarPart, this.currentPosture, this.currentDirection);

        this.avatarPartsContainer.addChild(avatarPart);
        this.avatarParts.push(avatarPart);
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

    public getOffsetX(): number {
        return 0;
    }

    public getOffsetY(): number {
        return 20;
    }
}

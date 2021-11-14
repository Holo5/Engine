import { AvatarPartSetsActions } from '../enums/AvatarPartSetsActions';
import { AvatarPart } from './AvatarPart';
import { AvatarPosture } from '../enums/AvatarPosture';
import { AvatarGesture } from '../enums/AvatarGesture';
import { GeometryManager } from '../figure-data-manager/geometry/GeometryManager';
import { AvatarExpression } from '../enums/AvatarExpression';
import { AvatarPartsContainer } from './AvatarPartsContainer';
import { AvatarBodyPart } from '../enums/AvatarBodyPart';

export class AvatarPartsSets {
    private _geometryManager: GeometryManager;
    private _avatarPartsContainer: AvatarPartsContainer;

    constructor(
        geometryManager: GeometryManager,
        avatarPartsContainer: AvatarPartsContainer,
    ) {
        this._geometryManager = geometryManager;
        this._avatarPartsContainer = avatarPartsContainer;
    }

    setCurrentAction(avatarPart: AvatarPart) {
        if (AvatarPartSetsActions[this._avatarPartsContainer.currentPosture].indexOf(avatarPart.getType()) !== -1) {
            avatarPart.updatePosture(this._avatarPartsContainer.currentPosture);
        }

        const avatarPartSetsActions = this._avatarPartsContainer.currentGesture === AvatarGesture.GESTURE_SPEAK ? AvatarPartSetsActions.spk : AvatarPartSetsActions.gesture;
        if (avatarPartSetsActions.indexOf(avatarPart.getType()) !== -1 && this._avatarPartsContainer.currentPosture !== AvatarPosture.POSTURE_LAY) {
            avatarPart.updateGesture(this._avatarPartsContainer.currentGesture);
        }

        if (AvatarPartSetsActions.handRight.indexOf(avatarPart.getType()) !== -1) {
            if (this._avatarPartsContainer.currentRightItemId !== undefined && this._avatarPartsContainer.currentPosture !== AvatarPosture.POSTURE_LAY) {
                avatarPart.updateGesture(AvatarGesture.GESTURE_CARRY);
            } else {
                avatarPart.updatePosture(this._avatarPartsContainer.currentPosture === AvatarPosture.POSTURE_SIT ? AvatarPosture.POSTURE_STAND : this._avatarPartsContainer.currentPosture);
            }
        }

        if (AvatarPartSetsActions.handLeft.indexOf(avatarPart.getType()) !== -1) {
            if (this._avatarPartsContainer.currentLeftItemId !== undefined && this._avatarPartsContainer.currentPosture !== AvatarPosture.POSTURE_LAY) {
                if (avatarPart.getType() === AvatarBodyPart.LEFT_COAT_SLEEVE) {
                    avatarPart.updateAction(AvatarExpression.EXPRESSION_WAVE, undefined, 0);
                } else {
                    avatarPart.updateAction(AvatarGesture.GESTURE_SIGNAL, undefined, 0);
                }
            } else {
                avatarPart.updatePosture(this._avatarPartsContainer.currentPosture === AvatarPosture.POSTURE_SIT ? AvatarPosture.POSTURE_STAND : this._avatarPartsContainer.currentPosture);
            }
        }

        if (avatarPart.getType() === AvatarBodyPart.LEFT_HAND_ITEM) {
            avatarPart.visible = this._avatarPartsContainer.currentLeftItemId !== undefined && this._avatarPartsContainer.currentPosture !== AvatarPosture.POSTURE_LAY;
            avatarPart.updateExpandedFigureDataPart(avatarPart.expandedFigureDataPart.toAnotherId(this._avatarPartsContainer.currentLeftItemId));
        }

        if (avatarPart.getType() === AvatarBodyPart.RIGHT_HAND_ITEM) {
            avatarPart.visible = this._avatarPartsContainer.currentRightItemId !== undefined && this._avatarPartsContainer.currentPosture !== AvatarPosture.POSTURE_LAY;
            avatarPart.updateExpandedFigureDataPart(avatarPart.expandedFigureDataPart.toAnotherId(this._avatarPartsContainer.currentRightItemId));
        }

        avatarPart.updateDirection(this._avatarPartsContainer.currentDirection);
    }

    setCurrentZIndex(avatarPart: AvatarPart, posture: AvatarPosture = AvatarPosture.POSTURE_STAND, direction: number = 2) {
        const draworder = this._geometryManager.getDraworder(posture, direction);
        avatarPart.zIndex = (draworder.indexOf(avatarPart.expandedFigureDataPart.type) * 10) + avatarPart.expandedFigureDataPart.index;
    }
}

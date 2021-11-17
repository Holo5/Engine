import { Avatar } from './Avatar';
import { AvatarBodyPart } from '../enums/AvatarBodyPart';
import { AvatarExpression } from '../enums/AvatarExpression';
import { AvatarGesture } from '../enums/AvatarGesture';
import { AvatarPart } from './AvatarPart';
import { AvatarPartSetsActions } from '../enums/AvatarPartSetsActions';
import { AvatarPosture } from '../enums/AvatarPosture';
import { GeometryManager } from '../figure-data-manager/geometry/GeometryManager';

export class AvatarPartsSets {
    private geometryManager: GeometryManager;
    private avatar: Avatar;

    constructor(
        geometryManager: GeometryManager,
        avatar: Avatar,
    ) {
        this.geometryManager = geometryManager;
        this.avatar = avatar;
    }

    setCurrentAction(avatarPart: AvatarPart) {
        if (AvatarPartSetsActions[this.avatar.currentPosture].indexOf(avatarPart.getType()) !== -1) {
            avatarPart.updatePosture(this.avatar.currentPosture);
        }

        const avatarPartSetsActions = this.avatar.currentGesture === AvatarGesture.GESTURE_SPEAK ? AvatarPartSetsActions.spk : AvatarPartSetsActions.gesture;
        if (avatarPartSetsActions.indexOf(avatarPart.getType()) !== -1 && this.avatar.currentPosture !== AvatarPosture.POSTURE_LAY) {
            avatarPart.updateGesture(this.avatar.currentGesture);
        }

        if (AvatarPartSetsActions.handRight.indexOf(avatarPart.getType()) !== -1) {
            if (this.avatar.currentRightItemId !== undefined && this.avatar.currentPosture !== AvatarPosture.POSTURE_LAY) {
                avatarPart.updateGesture(AvatarGesture.GESTURE_CARRY);
            } else {
                avatarPart.updatePosture(this.avatar.currentPosture === AvatarPosture.POSTURE_SIT ? AvatarPosture.POSTURE_STAND : this.avatar.currentPosture);
            }
        }

        if (AvatarPartSetsActions.handLeft.indexOf(avatarPart.getType()) !== -1) {
            if (this.avatar.currentLeftItemId !== undefined && this.avatar.currentPosture !== AvatarPosture.POSTURE_LAY) {
                if (avatarPart.getType() === AvatarBodyPart.LEFT_COAT_SLEEVE) {
                    avatarPart.updateAction(AvatarExpression.EXPRESSION_WAVE, undefined, 0);
                } else {
                    avatarPart.updateAction(AvatarGesture.GESTURE_SIGNAL, undefined, 0);
                }
            } else {
                avatarPart.updatePosture(this.avatar.currentPosture === AvatarPosture.POSTURE_SIT ? AvatarPosture.POSTURE_STAND : this.avatar.currentPosture);
            }
        }

        if (avatarPart.getType() === AvatarBodyPart.LEFT_HAND_ITEM) {
            avatarPart.visible = this.avatar.currentLeftItemId !== undefined && this.avatar.currentPosture !== AvatarPosture.POSTURE_LAY;
            avatarPart.updateExpandedFigureDataPart(avatarPart.expandedFigureDataPart.toAnotherId(this.avatar.currentLeftItemId));
        }

        if (avatarPart.getType() === AvatarBodyPart.RIGHT_HAND_ITEM) {
            avatarPart.visible = this.avatar.currentRightItemId !== undefined && this.avatar.currentPosture !== AvatarPosture.POSTURE_LAY;
            avatarPart.updateExpandedFigureDataPart(avatarPart.expandedFigureDataPart.toAnotherId(this.avatar.currentRightItemId));
        }

        avatarPart.updateDirection(this.avatar.currentDirection);
    }

    setCurrentZIndex(avatarPart: AvatarPart, posture: AvatarPosture = AvatarPosture.POSTURE_STAND, direction: number = 2) {
        const draworder = this.geometryManager.getDraworder(posture, direction);
        avatarPart.zIndex = (draworder.indexOf(avatarPart.expandedFigureDataPart.type) * 10) + avatarPart.expandedFigureDataPart.index;
    }
}

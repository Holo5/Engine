import * as PIXI from 'pixi.js';
import { ExpandedFigureDataPart } from '../figure-data-manager/ExpandedFigureDataPart';
import { AvatarGesture } from '../enums/AvatarGesture';
import { AvatarPosture } from '../enums/AvatarPosture';
import { GraphicGuid } from '../../../../../engine/utils/GraphicGuid';

export class AvatarPart extends PIXI.Sprite implements PIXI.DisplayObject {
    public expandedFigureDataPart: ExpandedFigureDataPart;
    textures: PIXI.Texture[];
    private _graphicGuid: string;
    private _resource: PIXI.LoaderResource;
    private _currentAction: string;
    private _direction: number;
    private _gesture: AvatarGesture | string;
    private _posture: AvatarPosture;
    private _currentTextureName: string;
    private _currentTextureIndex: number;

    constructor(
        resource: PIXI.LoaderResource,
        expandedFigureDataPart: ExpandedFigureDataPart,
    ) {
        super(PIXI.Texture.EMPTY);

        this.pluginName = 'batch';

        // TODO Some resources, like hair_M_messed1 haven't partsType
        if (resource.data.partsType !== undefined
          && resource.data.partsType[expandedFigureDataPart.type] !== undefined
          && resource.spritesheet.animations[expandedFigureDataPart.formattedDefaultFrameName()] !== undefined) {
            this.textures = resource.spritesheet.animations[expandedFigureDataPart.formattedDefaultFrameName()];
        } else {
            this.textures = [PIXI.Texture.EMPTY];
        }

        this._graphicGuid = GraphicGuid.create();
        this.expandedFigureDataPart = expandedFigureDataPart;
        this._resource = resource;
        this._direction = 2;
        this._gesture = AvatarGesture.GESTURE_STAND;
        this._posture = AvatarPosture.POSTURE_STAND;

        if (this.expandedFigureDataPart.color !== false && this.expandedFigureDataPart.type !== 'ey') {
            this.tint = parseInt(`0x${this.expandedFigureDataPart.color}`);
        }

        if (expandedFigureDataPart.type === 'sd') this.alpha = 0.3;
        if (!expandedFigureDataPart.defaultVisible) this.visible = false;
    }

    static fromResource(resource: PIXI.LoaderResource, expandedFigureDataPart: ExpandedFigureDataPart) {
        return new AvatarPart(
            resource,
            expandedFigureDataPart,
        );
    }

    public updateFrame(frameNumber: number) {
        this._currentTextureIndex = frameNumber % this.textures.length;
        this.texture = this.textures[this._currentTextureIndex];
    }

    updateGesture(gesture: AvatarGesture | string, direction?: number) {
        this._gesture = gesture;
        this.updateAction(gesture, direction);
    }

    updatePosture(posture: AvatarPosture, direction?: number) {
        if (this.expandedFigureDataPart.type === 'sd' && posture !== AvatarPosture.POSTURE_SIT) {
            this._posture = AvatarPosture.POSTURE_STAND;
            this.updateAction(AvatarPosture.POSTURE_STAND, 0);
        } else if (this._resource.data.partsType[this.getType()]?.gestures.indexOf(posture) !== -1) {
            this._posture = posture;
            this.updateAction(posture, direction);
        } else {
            this.updateDirection(direction);
        }
    }

    updateDirection(direction: number) {
        if (direction === this._direction) return;

        if (this._gesture !== AvatarGesture.GESTURE_STAND) {
            this.updateAction(this._gesture, direction);
        } else {
            this.updateAction(this._posture, direction);
        }
    }

    public updateAction(action: string, direction?: number, fixFrame: number | false = false) {
        this._currentAction = action;
        const finalDirection = direction !== undefined ? direction : this._direction;
        this._currentTextureName = `${this.expandedFigureDataPart.type}_${this.expandedFigureDataPart.id}_${action}_${finalDirection}`;
        if (this._resource?.spritesheet?.animations[this._currentTextureName] !== undefined
          && this._resource?.spritesheet?.animations[this._currentTextureName][0] !== undefined) {
            this.textures = this._resource.spritesheet.animations[this._currentTextureName];
            this.visible = true;
        } else if (direction === 0 || direction === 6 || direction === 7 || action === AvatarPosture.POSTURE_LAY) this.visible = false;

        if (fixFrame !== false) {
            this.texture = this.textures[fixFrame];
        }

        this._direction = finalDirection;
    }

    getType() {
        return this.expandedFigureDataPart.type;
    }

    updateExpandedFigureDataPart(expandedFigureDataPart: ExpandedFigureDataPart) {
        this.expandedFigureDataPart = expandedFigureDataPart;
        this.updateAction(this._currentAction);
    }

    public get currentTextureName(): string {
        return `${this._currentTextureName}${this._currentTextureIndex}`;
    }
}

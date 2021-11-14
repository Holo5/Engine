import { IPointData, Container, DisplayObject } from 'pixi.js';
import { IAnimation } from '../../../../object/interfaces/IAnimation';
import { ITween } from '../../../../object/interfaces/ITween';
import { IAvatarAssetsManager } from '../assets-manager/interfaces/IAvatarAssetsManager';
import { AvatarPartsSets } from './AvatarPartsSets';
import { AvatarPart } from './AvatarPart';
import { ExpandedFigureDataPart } from '../figure-data-manager/ExpandedFigureDataPart';
import { AvatarGesture } from '../enums/AvatarGesture';
import { AvatarPosture } from '../enums/AvatarPosture';
import { GeometryData } from '../figure-data-manager/geometry/GeometryData';
import { Engine } from '../../../../../engine/Engine';
import { Logger } from '../../../../../../../../common/logger/Logger';
import { GeometryManager } from '../figure-data-manager/geometry/GeometryManager';
import { AnimatedGraphicObject } from '../../../../object/AnimatedGraphicObject';
import { GraphicData } from '../../../../object/cache/GraphicData';

export class AvatarPartsContainer extends AnimatedGraphicObject {
    public animation: IAnimation;
    public tween: ITween;

    private _engine: Engine;
    private _assetsManager: IAvatarAssetsManager;
    private _avatarPartSets: AvatarPartsSets;
    private _currentDirection: number = 2;
    private _currentDirectionOriginal: number = 2;
    private _currentGesture: AvatarGesture = AvatarGesture.GESTURE_STAND;
    private _currentPosture: AvatarPosture = AvatarPosture.POSTURE_STAND;
    private _currentRightItemId: string;
    private _currentLeftItemId: string;

    private _avatarPartsContainer: Container;

    constructor(
        engine: Engine,
        assetsManager: IAvatarAssetsManager,
        geometryManager: GeometryManager,
    ) {
        super(engine.animationTicker, engine.graphicTransformer);

        this._engine = engine;
        this._assetsManager = assetsManager;
        this._avatarPartSets = new AvatarPartsSets(geometryManager, this);

        this._avatarPartsContainer = new Container();
        this._avatarPartsContainer.sortableChildren = true;

        this.graphic.anchor.set(0.5, 1);
        this.updateDirection(this._currentDirection);
    }

    protected updateRenderableData(id: string, object: DisplayObject) {
        if (this._textureDictionnary[id] !== undefined) {
            this.setRenderableData(this._textureDictionnary[id]);
        } else {
            const renderableData = this._graphicTransformer.createRenderableWithoutHitArea(object, Engine.AVATAR_BOUNDS);
            this._textureDictionnary[id] = renderableData;

            this.setRenderableData(renderableData);
        }
    }

    render() {
        let textureName = '';
        this._avatarPartsContainer.children.forEach((child: AvatarPart) => {
            if (child.updateFrame !== undefined) {
                child.updateFrame(this._currentFrame);
            }
            textureName += child.currentTextureName;
        });

        this.updateRenderableData(textureName, this._avatarPartsContainer);
    }

    loadExpandedFigureDataParts(...expandedFigureDataParts: ExpandedFigureDataPart[]) {
        expandedFigureDataParts.forEach((expandedFigureDataPart) => {
            this._assetsManager.request(expandedFigureDataPart.assetName, (data) => {
                try {
                    const avatarPart = AvatarPart.fromResource(data, expandedFigureDataPart);
                    this.addAvatarPart(avatarPart);
                } catch (e) {
                    Logger.error('Can\'t create an AvatarPart', expandedFigureDataPart, expandedFigureDataPart.formattedDefaultFrameName());
                    Logger.error(e);
                }
            });
        });
    }

    addAvatarPart(avatarPart: AvatarPart) {
        avatarPart.updateDirection(this._currentDirection);
        this._avatarPartSets.setCurrentAction(avatarPart);
        this._avatarPartSets.setCurrentZIndex(avatarPart, this._currentPosture, this._currentDirection);

        this._avatarPartsContainer.addChild(avatarPart);
    }

    public setRenderableData(renderableData: GraphicData) {
        this.graphic.texture = renderableData.texture;

        this.graphic.containsPoint = (position: IPointData) => renderableData.hitArea.contains(Math.floor(position.x - this.graphic.x),
            Math.floor(position.y - this.graphic.y));
    }

    public getZIndex(): number {
        return this.screenPosition.z;
    }

    updateAllAvatarParts() {
        this._avatarPartsContainer.children.forEach((avatarPart: AvatarPart) => {
            this._avatarPartSets.setCurrentZIndex(avatarPart, this._currentPosture, this._currentDirection);
            this._avatarPartSets.setCurrentAction(avatarPart);
        });
        this.render();
    }

    updateLeftItem(itemId: string | false) {
        this._currentLeftItemId = itemId !== false ? itemId : undefined;
        this.updateAllAvatarParts();
        return this;
    }

    updateRightItem(itemId: string | false) {
        this._currentRightItemId = itemId !== false ? itemId : undefined;
        this.updateAllAvatarParts();
    }

    updateGesture(gesture: AvatarGesture) {
        this._currentGesture = gesture;
        this.updateAllAvatarParts();
    }

    updatePosture(posture: AvatarPosture) {
        if (posture === this._currentPosture) return;

        this._currentPosture = posture;
        this.updateAllAvatarParts();
    }

    updateDirection(direction: number) {
        if (direction === this._currentDirectionOriginal) return;

        const directionIndex = GeometryData.reversedDirection.indexOf(direction);

        this.graphic.scale.x = directionIndex !== -1 ? -1 : 1;
        this._currentDirection = GeometryData.normalDirection[directionIndex] !== undefined ? GeometryData.normalDirection[directionIndex] : direction;
        this._currentDirectionOriginal = direction;

        this.updateAllAvatarParts();
    }

    public getOffsetX(): number {
        return 0;
    }

    public getOffsetY(): number {
        return 20;
    }

    public get currentDirection(): number {
        return this._currentDirection;
    }

    public get currentGesture(): AvatarGesture {
        return this._currentGesture;
    }

    public get currentPosture(): AvatarPosture {
        return this._currentPosture;
    }

    public get currentRightItemId(): string {
        return this._currentRightItemId;
    }

    public get currentLeftItemId(): string {
        return this._currentLeftItemId;
    }
}

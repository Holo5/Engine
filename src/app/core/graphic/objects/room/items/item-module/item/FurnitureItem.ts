import { DisplayObject, Texture, Resource } from 'pixi.js';
import { IVector3D } from '@holo5/roombuilder';
import { IFurniProperty } from './interfaces/IFurniProperty';
import { FurniData } from '../assets-manager/FurniData';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { Engine } from '../../../../../engine/Engine';
import { FurnitureLogic } from './logics/FurnitureLogic';
import { IGraphicObject } from '../../../../object/interfaces/IGraphicObject';
import { Disposable } from '../../../../../../../../common/disposable/Disposable';
import { PlaceholderVisualization } from './visualizations/PlaceholderVisualization';
import { ITween } from '../../../../object/interfaces/ITween';
import { IAnimation } from '../../../../object/interfaces/IAnimation';
import { SortableContainer } from '../../../../../engine/container/SortableContainer';
import { DownloadItemAssetsManager } from '../assets-manager/DownloadItemAssetsManager';
import { FurnitureAnimation } from './graphic/FurnitureAnimation';
import { FurnitureTween } from './graphic/FurnitureTween';
import { ShadowVisualization } from './visualizations/ShadowVisualization';
import { VisualizationFactory } from './visualizations/VisualizationFactory';
import { Logger } from '../../../../../../../../common/logger/Logger';
import { EventCategory } from '../../../../object/enums/EventCategory';

export class FurnitureItem extends Disposable implements IGraphicObject {
    public engine: Engine;

    public graphic: DisplayObject;
    public fixedAlpha: number;
    public mapPosition: IVector3D;
    public screenPosition: IVector3D;
    public direction: number;
    public state: string;
    public animation: IAnimation;
    public tween: ITween;
    public itemId: number;

    public furniData: FurniData;
    public furniProperty: IFurniProperty;

    protected itemAssetsManager: DownloadItemAssetsManager;
    protected furnitureLogic: FurnitureLogic;
    protected _visualizations: FurnitureVisualization[];
    public guid: string;
    public eventCategory: EventCategory;

    private _index: number;
    private _textures: { [p: string]: Texture<Resource> };

    constructor(engine: Engine, itemAssetsManager: DownloadItemAssetsManager, placeholderVisualization: PlaceholderVisualization, index: number = 0) {
        super();

        this.engine = engine;
        this.itemAssetsManager = itemAssetsManager;

        this.animation = new FurnitureAnimation(this);
        this.tween = new FurnitureTween(this);

        this._textures = {};
        this._visualizations = [placeholderVisualization];
        this._index = index;

        this.furnitureLogic = new FurnitureLogic();
    }

    build() {
        const [placeholderVisualization] = this._visualizations;
        this._visualizations = [];

        this.engine.sortableContainer.removeGraphicObject(placeholderVisualization);

        const VisualizationType = VisualizationFactory.buildVisualizationFactory(this.furniProperty.infos.visualization);
        this._visualizations.push(new ShadowVisualization(
            this.engine,
            this.furniData,
            -1,
            this.furniProperty,
            this.mapPosition,
            this.screenPosition,
            this._textures,
        ));

        const { layerCount } = this.furniProperty.visualization;
        for (let i = 0; i < layerCount; i++) {
            this._visualizations.push(new VisualizationType(
                this.engine,
                this.furniData,
                i,
                this.furniProperty,
                this.mapPosition,
                this.screenPosition,
                this._textures,
                this._index,
            ));
        }

        this.furnitureLogic.initialize(this);

        this.updateFromVectors(this.mapPosition, this.screenPosition);
        this.updateDirection(this.direction);
        this.updateState(this.state);

        this._visualizations.forEach((v) => {
            this.engine.sortableContainer.addGraphicObject(v);
        });
    }

    private loadItem() {
        if (this.furniData === undefined) return;

        this.itemAssetsManager.request(this.furniData.className, (data) => {
            this.furniProperty = data.data.furniProperty as IFurniProperty;
            this._textures = data.textures;
            // if (this.furniData.className !== 'val12_marble1') return;
            this.build();
        }, (error) => {
            Logger.error(`Can't load furniture: ${error}`);
        });
    }

    public addInContainerAndDisplay(container: SortableContainer): void {
        const [placeHolderVisualization] = this._visualizations;
        placeHolderVisualization.animation.preDisplay();
        this.engine.sortableContainer.addGraphicObject(placeHolderVisualization);
        placeHolderVisualization.animation.display(this.loadItem.bind(this));

        // this.loadItem();
    }

    public updateFromVectors(mapPosition: IVector3D, screenPosition: IVector3D): void {
        this.mapPosition = mapPosition;
        this.screenPosition = screenPosition;

        this._visualizations.forEach((visualization: FurnitureVisualization) => {
            visualization.updateFromVectors(mapPosition, screenPosition);
        });
    }

    public dispose(): void {
        this.disposed = true;
        this._visualizations.forEach((object) => {
            object.dispose();
        });
    }

    updateDirection(direction: number, animated: boolean = false) {
        this.direction = direction;
        this._visualizations.forEach((object) => {
            if (animated) {
                object.animation.rotateTo(direction);
            } else {
                object.updateDirection(direction);
            }
        });
    }

    updateState(state: string) {
        this.state = state;
        this._visualizations.forEach((object) => {
            object.updateState(state);
        });
    }

    public getName(): string {
        return this.furniData.name;
    }

    public get visualisation(): FurnitureVisualization[] {
        return this._visualizations;
    }

    public onDispose(): void {}

    public getOffsetX(): number { return 0; }
    public getOffsetY(): number { return 0; }
    public getZIndex(): number { return 0; }
}

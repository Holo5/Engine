import * as PIXI from 'pixi.js';
import { FurniData } from '../assets-manager/FurniData';
import { FurnitureItem } from './FurnitureItem';
import { RoomBackgroundVisualization } from './visualizations/RoomBackgroundVisualization';
import { Ticker } from '../../../../../engine/ticker/Ticker';
import { Engine } from '../../../../../engine/Engine';
import { DownloadItemAssetsManager } from '../assets-manager/DownloadItemAssetsManager';
import { PlaceholderVisualization } from './visualizations/PlaceholderVisualization';
import { SortableContainer } from '../../../../../engine/container/SortableContainer';

export class AdsFurnitureItem extends FurnitureItem {
    protected _datas: string[];

    constructor(engine: Engine, itemAssetsManager: DownloadItemAssetsManager, placeholderVisualization: PlaceholderVisualization, index: number = 0, datas: string[]) {
        super(engine, itemAssetsManager, placeholderVisualization, index);

        this._visualizations = [];
        this._datas = datas;
    }

    public addInContainerAndDisplay(container: SortableContainer) {
        container.addGraphicObject(this._visualizations[0]);
    }

    buildAds() {
        this._visualizations.push(
            new RoomBackgroundVisualization(this.engine, this.furniData, 0, this.furniProperty, this.mapPosition, this.screenPosition, {}, 0, this._datas),
        );
    }
}

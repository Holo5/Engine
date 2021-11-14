import { FigureDataManager } from './figure-data-manager/FigureDataManager';
import { BaseFigureDataPart } from './figure-data-manager/BaseFigureDataPart';
import { ExpandedFigureDataPart } from './figure-data-manager/ExpandedFigureDataPart';
import { AvatarPartsContainer } from './avatar-parts/AvatarPartsContainer';
import { GeometryManager } from './figure-data-manager/geometry/GeometryManager';
import { DownloadAssetsManager } from './assets-manager/DownloadAssetsManager';
import { IAvatarAssetsManager } from './assets-manager/interfaces/IAvatarAssetsManager';
import { AvatarPosture } from './enums/AvatarPosture';
import { AvatarGesture } from './enums/AvatarGesture';
import { GraphicTransformer } from '../../../../engine/utils/GraphicTransformer';
import { Ticker } from '../../../../engine/ticker/Ticker';
import { Engine } from '../../../../engine/Engine';
import { GraphicCacheManager } from '../../../object/cache/GraphicCacheManager';

export class AvatarModule {
    public engine: Engine;
    public ticker: Ticker;
    public graphicCacheManager: GraphicCacheManager;
    public graphicTransformer: GraphicTransformer;

    private _figureDataManager: FigureDataManager;
    private _geometryManager: GeometryManager;
    private _itemsAssetsManager: IAvatarAssetsManager;

    constructor(
        engine: Engine,
    ) {
        this.engine = engine;
        this.ticker = engine.animationTicker;
        this.graphicCacheManager = engine.graphicCacheManager;
        this.graphicTransformer = engine.graphicTransformer;

        this._figureDataManager = new FigureDataManager();
        this._geometryManager = new GeometryManager();
        this._itemsAssetsManager = new DownloadAssetsManager();
    }

    async init() {
        const baseAssetsFiles = await this._itemsAssetsManager.initBaseAssetsFiles();

        this._figureDataManager.init(baseAssetsFiles.figureData);
        this._geometryManager.init();
    }

    buildFromFigure(figure: string): AvatarPartsContainer {
        const baseFigureDataParts: BaseFigureDataPart[] = figure.split('.').map((value) => {
            const values = value.split('-');
            return new BaseFigureDataPart(values[0], values[1], values[2]);
        });

        const expandedFigureDataParts: ExpandedFigureDataPart[] = this._figureDataManager.retrieveExpandedParts(baseFigureDataParts);

        expandedFigureDataParts.push(new ExpandedFigureDataPart('1', 'hh_human_body', 0, 'sd', false, AvatarPosture.POSTURE_STAND, '0'));
        expandedFigureDataParts.push(new ExpandedFigureDataPart('69', 'hh_human_item', 0, 'ri', false, AvatarGesture.GESTURE_CARRY));
        expandedFigureDataParts.push(new ExpandedFigureDataPart('1', 'hh_human_item', 0, 'li', false, AvatarGesture.GESTURE_SIGNAL));

        const avatarPartsContainer = new AvatarPartsContainer(this.engine, this._itemsAssetsManager, this._geometryManager);
        avatarPartsContainer.loadExpandedFigureDataParts(...expandedFigureDataParts);

        return avatarPartsContainer;
    }
}

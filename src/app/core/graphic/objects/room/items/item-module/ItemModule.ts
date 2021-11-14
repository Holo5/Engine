import { Texture, Sprite, RenderTexture, Container, Graphics, SCALE_MODES } from 'pixi.js';
import { Vector3d } from '@holo5/roombuilder';
import { DownloadItemAssetsManager } from './assets-manager/DownloadItemAssetsManager';
import { FurniDataManager } from './assets-manager/FurniDataManager';
import { FurnitureItem } from './item/FurnitureItem';
import { Engine } from '../../../../engine/Engine';
import { ItemPlaceholder } from './ItemPlaceholder';
import { Configuration } from '../../../../../../../conf';
import { FurniData } from './assets-manager/FurniData';
import { PlaceholderVisualization } from './item/visualizations/PlaceholderVisualization';
import { AdsFurnitureItem } from './item/AdsFurnitureItem';
import { CursorVisualization } from './item/visualizations/CursorVisualization';
import { IBaseAssetsFiles } from './assets-manager/interfaces/IItemAssetsManager';

export class ItemModule {
    public engine: Engine;

    private _baseAssetsFiles: IBaseAssetsFiles;
    private _furniDataManager: FurniDataManager;
    private _itemsAssetsManager: DownloadItemAssetsManager;
    private _placeholderVisualization: Texture;

    constructor(
        engine: Engine,
    ) {
        this.engine = engine;

        this._furniDataManager = new FurniDataManager();
        this._itemsAssetsManager = new DownloadItemAssetsManager();
    }

    async init() {
        this._baseAssetsFiles = await this._itemsAssetsManager.initBaseAssetsFiles();
        this._furniDataManager.init(this._baseAssetsFiles.furniData);
        this._placeholderVisualization = this.engine.graphicTransformer.createRenderableWithoutHitArea(new Sprite(this._baseAssetsFiles.itemPlaceholderTexture)).texture;
    }

    buildPlaceholder(): ItemPlaceholder {
        const placeholder = new ItemPlaceholder(this._placeholderVisualization);

        return placeholder;
    }

    buildIcon(spriteId: number) {
        const furniData = this._furniDataManager.findFloorItem(spriteId);

        if (furniData === undefined) {
            return Configuration.images.iconsDomain + Configuration.images.placeholderIconName;
        }

        if (furniData.color !== undefined) {
            return `${Configuration.images.iconsDomain + furniData.className}_${furniData.color}_icon.png`;
        }

        return `${Configuration.images.iconsDomain + furniData.className}_icon.png`;
    }

    getInventoryItemFurniData(spriteId: number): FurniData {
        return this._furniDataManager.findFloorItem(spriteId);
    }

    getCatalogItemFurniData(itemDisplayName: string): FurniData {
        const spriteId = this._furniDataManager.resolveSpriteIdFromDisplayName(itemDisplayName);

        return this._furniDataManager.findFloorItem(spriteId);
    }

    getGiftSpriteIdFromGiftId(giftId: number): number {
        return this._furniDataManager.resolveSpriteIdFromItemId(giftId);
    }

    getGiftItemFurniData(giftId: number): FurniData {
        const spriteId = this._furniDataManager.resolveSpriteIdFromItemId(giftId);

        return this._furniDataManager.findFloorItem(spriteId);
    }

    buildTileCursor(): CursorVisualization {
        return new CursorVisualization(this.engine, undefined, 0, undefined, new Vector3d(0, 0, 0), undefined, this._baseAssetsFiles.tileCursor);
    }

    buildFloorItem(spriteId: number, index: number): FurnitureItem {
        const furniData = this._furniDataManager.findFloorItem(spriteId);
        const furnitureItem = new FurnitureItem(this.engine, this._itemsAssetsManager, new PlaceholderVisualization(this.engine, this._placeholderVisualization), index);
        furnitureItem.furniData = furniData;

        return furnitureItem;
    }

    buildAdsItem(spriteId: number, index: number, datas: string[]): AdsFurnitureItem {
        const furniData = this._furniDataManager.findFloorItem(spriteId);
        const furnitureItem = new AdsFurnitureItem(this.engine, this._itemsAssetsManager, new PlaceholderVisualization(this.engine, this._placeholderVisualization), index, datas);
        furnitureItem.furniData = furniData;
        furnitureItem.buildAds();

        return furnitureItem;
    }

    buildItemForPreview(furnitureItem: FurnitureItem): { image: RenderTexture, width: number, height: number } {
        const container = new Container();

        furnitureItem.visualisation.forEach((visualization) => {
            const sprite = new Sprite(visualization.graphic.texture);
            sprite.alpha = visualization.graphic.alpha;
            sprite.blendMode = visualization.graphic.blendMode;
            sprite.tint = visualization.graphic.tint;
            container.addChild(sprite);
        });

        const bounds = container.getBounds();
        const graphic = new Graphics().beginFill(0x5B5B5B).drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

        container.addChildAt(graphic, 0);

        const itemPreview = this.engine.app.renderer.generateTexture(container, SCALE_MODES.NEAREST, 1);

        return {
            image: itemPreview,
            width: itemPreview.width,
            height: itemPreview.height,
        };
    }
}

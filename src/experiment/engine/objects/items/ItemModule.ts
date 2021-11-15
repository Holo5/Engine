import { Configuration } from '../../../../conf';
import { Engine } from '../../Engine';
import { FurniData } from './assets-manager/FurniData';
import { FurniDataManager } from './assets-manager/FurniDataManager';
import { IFurniData } from './interfaces/IFurniData';
import { PlaceholderVisualization } from './visualizations/PlaceholderVisualization';

export class ItemModule {

    private furniDataManager: FurniDataManager;

    constructor(
        public engine: Engine,
    ) {
        this.engine.assetsManager.has('furnidata', Configuration.images.furnitureDomain + 'furnidata.json');
        this.engine.assetsManager.has('placeholder', Configuration.images.furnitureDomain + 'item_placeholder_64.png');
        this.engine.assetsManager.has('tilecursor', Configuration.images.furnitureDomain + 'TileCursor/TileCursor.json');
        this.furniDataManager = new FurniDataManager();
    }

    init() {
        this.furniDataManager.init(this.engine.assetsManager.get('furnidata').data as IFurniData);
    }

    buildPlaceholder(): PlaceholderVisualization {
        return new PlaceholderVisualization();
    }

    buildIcon(spriteId: number) {
        const furniData = this.furniDataManager.findFloorItem(spriteId);

        if (furniData === undefined) {
            return Configuration.images.iconsDomain + Configuration.images.placeholderIconName;
        }

        if (furniData.color !== undefined) {
            return `${Configuration.images.iconsDomain + furniData.className}_${furniData.color}_icon.png`;
        }

        return `${Configuration.images.iconsDomain + furniData.className}_icon.png`;
    }

    getInventoryItemFurniData(spriteId: number): FurniData {
        return this.furniDataManager.findFloorItem(spriteId);
    }

    getCatalogItemFurniData(itemDisplayName: string): FurniData {
        const spriteId = this.furniDataManager.resolveSpriteIdFromDisplayName(itemDisplayName);

        return this.furniDataManager.findFloorItem(spriteId);
    }

    getGiftSpriteIdFromGiftId(giftId: number): number {
        return this.furniDataManager.resolveSpriteIdFromItemId(giftId);
    }

    getGiftItemFurniData(giftId: number): FurniData {
        const spriteId = this.furniDataManager.resolveSpriteIdFromItemId(giftId);

        return this.furniDataManager.findFloorItem(spriteId);
    }

    // buildTileCursor(): CursorVisualization {
    //     return new CursorVisualization(this.engine, undefined, 0, undefined, new Vector3d(0, 0, 0), undefined, this._baseAssetsFiles.tileCursor);
    // }
    //
    // buildFloorItem(spriteId: number, index: number): FurnitureItem {
    //     const furniData = this._furniDataManager.findFloorItem(spriteId);
    //     const furnitureItem = new FurnitureItem(this.engine, this._itemsAssetsManager, new PlaceholderVisualization(this.engine, this._placeholderVisualization), index);
    //     furnitureItem.furniData = furniData;
    //
    //     return furnitureItem;
    // }

    // buildAdsItem(spriteId: number, index: number, datas: string[]): AdsFurnitureItem {
    //     const furniData = this._furniDataManager.findFloorItem(spriteId);
    //     const furnitureItem = new AdsFurnitureItem(this.engine, this._itemsAssetsManager, new PlaceholderVisualization(this.engine, this._placeholderVisualization), index, datas);
    //     furnitureItem.furniData = furniData;
    //     furnitureItem.buildAds();
    //
    //     return furnitureItem;
    // }

    // buildItemForPreview(furnitureItem: FurnitureItem): { image: RenderTexture, width: number, height: number } {
    //     const container = new Container();
    //
    //     furnitureItem.visualisation.forEach((visualization) => {
    //         const sprite = new Sprite(visualization.graphic.texture);
    //         sprite.alpha = visualization.graphic.alpha;
    //         sprite.blendMode = visualization.graphic.blendMode;
    //         sprite.tint = visualization.graphic.tint;
    //         container.addChild(sprite);
    //     });
    //
    //     const bounds = container.getBounds();
    //     const graphic = new Graphics().beginFill(0x5B5B5B).drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
    //
    //     container.addChildAt(graphic, 0);
    //
    //     const itemPreview = this.engine.app.renderer.generateTexture(container, SCALE_MODES.NEAREST, 1);
    //
    //     return {
    //         image: itemPreview,
    //         width: itemPreview.width,
    //         height: itemPreview.height,
    //     };
    // }
}

import { FurnitureItem } from '../../graphic/objects/room/items/item-module/item/FurnitureItem';
import { Core } from '../../Core';
import { MoveItemComposer } from '../../network/packets/outgoing/room/item/MoveItemComposer';
import { PickupItemComposer } from '../../network/packets/outgoing/room/item/PickupItemComposer';
import { ChangeItemStateComposer } from '../../network/packets/outgoing/room/item/ChangeItemStateComposer';

export class PlayerInteraction {
    private _selectedFurnitureItem: FurnitureItem;
    private _itemPreviewDictionary: { [key: string]: { image: string, width: number, height: number } };

    constructor(public core: Core) {
        this._itemPreviewDictionary = {};
    }

    private generateItemPreview(furnitureItem: FurnitureItem): { image: string, width: number, height: number } {
        if (this._itemPreviewDictionary[furnitureItem.furniData.className] !== undefined) {
            return this._itemPreviewDictionary[furnitureItem.furniData.className];
        }

        const furnitureItemTexture = this.core.engine.itemModule.buildItemForPreview(furnitureItem);
        const base64 = this.core.engine.graphicTransformer.generateBase64(furnitureItemTexture.image);
        const finalItemPreview = {
            image: base64,
            width: furnitureItemTexture.width,
            height: furnitureItemTexture.height,
        };

        this._itemPreviewDictionary[furnitureItem.furniData.className] = finalItemPreview;

        return finalItemPreview;
    }

    selectFurnitureItem(furnitureItem: FurnitureItem) {
        this._selectedFurnitureItem = furnitureItem;

        const itemPreview = this.generateItemPreview(furnitureItem);
        const itemSize = itemPreview.width < 200 && itemPreview.height < 200 ? 'm' : 's';

        this.core.store.commit('previewInteraction/setData', {
            itemData: {
                displayName: furnitureItem.furniData.className,
                color: furnitureItem.furniData.color,
            },
            graphic: itemPreview.image,
            name: furnitureItem.furniData.name,
            description: furnitureItem.furniData.description,
            size: itemSize,
        });
    }

    move() {
        if (this._selectedFurnitureItem !== undefined && this.core.gameManager.permissionsManager.userHasRights()) {
            this.core.gameManager.roomManager.floorItemPlacer.placingFurniFromInventory = false;

            this.core.gameManager.roomManager.floorItemPlacer.startPlacingFurniFrom(this._selectedFurnitureItem);
        }
    }

    pickUp() {
        if (this._selectedFurnitureItem !== undefined && this.core.gameManager.permissionsManager.userHasRights()) {
            const composer = new PickupItemComposer(
                2,
                this._selectedFurnitureItem.itemId,
            );

            this.core.network.socketClient.processOutgoing(composer);
        }
    }

    rotate() {
        if (this._selectedFurnitureItem !== undefined && this.core.gameManager.permissionsManager.userHasRights()) {
            const currentDirection = this._selectedFurnitureItem.direction;
            const furniDirections = this._selectedFurnitureItem.furniProperty?.visualization?.directions;
            if (furniDirections !== undefined && furniDirections.length > 1) {
                const directions = [...furniDirections, ...furniDirections];
                const finalDirection = directions[furniDirections.indexOf(currentDirection) + 1];

                const composer = new MoveItemComposer(
                    this._selectedFurnitureItem.itemId,
                    this._selectedFurnitureItem.mapPosition.x,
                    this._selectedFurnitureItem.mapPosition.y,
                    finalDirection,
                );

                this.core.network.socketClient.processOutgoing(composer);
            }
        }
    }

    useIt() {
        if (this._selectedFurnitureItem !== undefined) {
            const composer = new ChangeItemStateComposer(
                0,
                this._selectedFurnitureItem.itemId,
            );

            this.core.network.socketClient.processOutgoing(composer);
        }
    }
}

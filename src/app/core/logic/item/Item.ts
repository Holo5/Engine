import { IVector3D, ObjectType, PositionComputer } from '@holo5/roombuilder';
import { FurnitureItem } from '../../graphic/objects/room/items/item-module/item/FurnitureItem';
import { ItemPlaceholder } from '../../graphic/objects/room/items/item-module/ItemPlaceholder';
import { FurniData } from '../../graphic/objects/room/items/item-module/assets-manager/FurniData';
import { Engine } from '../../graphic/engine/Engine';
import { AdsFurnitureItem } from '../../graphic/objects/room/items/item-module/item/AdsFurnitureItem';
import { Disposable } from '../../../../common/disposable/Disposable';

export class Item extends Disposable {
    public engine: Engine;
    public furniData: FurniData;

    protected _index: number;
    protected _itemId: number;
    protected _spriteId: number;
    protected _mapPosition: IVector3D;
    protected _state: string;
    protected _direction: number;
    protected _stackZ: string;
    protected _furnitureItem: FurnitureItem;

    public constructor(engine: Engine, index: number, itemId: number, spriteId: number, mapPosition: IVector3D, state: string, direction: number, stackZ: string) {
        super();

        this._index = index;
        this.engine = engine;
        this._itemId = itemId;
        this._spriteId = spriteId;
        this._mapPosition = mapPosition;
        this._state = state;
        this._direction = direction;
        this._stackZ = stackZ;
    }

    public buildGraphic() {
        this._furnitureItem = this.engine.itemModule.buildFloorItem(this._spriteId, this._index);
        this._furnitureItem.updateDirection(this._direction);
        this._furnitureItem.updateState(this._state);

        this._furnitureItem.itemId = this._itemId;

        this.updateMapPosition(this._mapPosition);

        this._furnitureItem.addInContainerAndDisplay(this.engine.sortableContainer);
    }

    public updateMapPosition(mapPosition: IVector3D) {
        this._mapPosition = mapPosition;

        this._furnitureItem.updateFromVectors(this._mapPosition, PositionComputer.getScreenPosition(this._mapPosition));

        return this;
    }

    public updateDirection(direction: number) {
        if (direction !== this._direction) {
            this._direction = direction;
            this._furnitureItem.updateDirection(direction, true);
        }
    }

    public updateState(state: string) {
        if (state !== this._state) {
            this._state = state;
            (this._furnitureItem as FurnitureItem).updateState(state);
        }
    }

    public onDispose(): void {
        // @ts-ignore
        if (this._furnitureItem.autoRemove !== undefined) {
            // (this._furnitureItem as FurnitureItem).autoRemove();
        }
    }

    public display() {

    }

    public get itemId(): number {
        return this._itemId;
    }
}

import { IVector3D } from '@holo5/roombuilder';
import { Item } from './Item';
import { Engine } from '../../graphic/engine/Engine';

export class AdsItem extends Item {
    private _datas: string[];

    constructor(engine: Engine, index: number, itemId: number, spriteId: number, mapPosition: IVector3D, direction: number, stackZ: string, datas: string[]) {
        super(engine, index, itemId, spriteId, mapPosition, '0', direction, stackZ);

        this._datas = datas;
    }

    public buildGraphic() {
        this._furnitureItem = this.engine.itemModule.buildAdsItem(this._spriteId, this._index, this._datas);
        this._furnitureItem.updateDirection(this._direction);

        this.updateMapPosition(this._mapPosition);

        this._furnitureItem.addInContainerAndDisplay(this.engine.sortableContainer);
    }
}

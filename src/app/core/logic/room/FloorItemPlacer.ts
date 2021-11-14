import * as PIXI from 'pixi.js';
import { IVector3D } from '@holo5/roombuilder';
import { Core } from '../../Core';
import { InventoryItem } from '../inventory/InventoryItem';
import { Engine } from '../../graphic/engine/Engine';
import { TileClickedEvent, TileHoveredEvent, TileRestedEvent } from '../../event/TileEvents';
import { FurnitureItem } from '../../graphic/objects/room/items/item-module/item/FurnitureItem';
import { OutsideStageClickedEvent } from '../../event/StageEvent';

export class FloorItemPlacer {
    public placingFurniFromInventory: boolean;

    private placingFurni: boolean;
    private inventoryItem: InventoryItem;
    private engine: Engine;

    private _currentIconSprite: PIXI.Sprite;
    private _currentFurnitureItem: FurnitureItem;

    private _newItem: boolean;
    private _moveExistingItem: boolean;
    private _startPosition: IVector3D;

    constructor(
        public core: Core,
    ) {
        this.engine = core.engine;
        this.placingFurni = false;
        this.placingFurniFromInventory = false;

        this.engine.graphicEventBus.subscribe(TileHoveredEvent, (e) => {
            if (this.placingFurni) {
                // this.hoverTile(e.payload.graphicLocation, e.payload.stackHeight);
            }
        });

        this.engine.graphicEventBus.subscribe(TileRestedEvent, (e) => {
            if (this.placingFurni) {
                this.loseHoverTile();
            }
        });

        this.engine.graphicEventBus.subscribe(TileClickedEvent, (e) => {
            if (this.placingFurni) {
                // this.clickTile(e.payload.graphicLocation);
            }
        });

        this.engine.graphicEventBus.subscribe(OutsideStageClickedEvent, (e) => {
            if (this.placingFurni) {
                this.removeGraphicsAndStop();
            }
        });
    }

    private iconMoveEvent(e: PIXI.InteractionEvent) {
        this._currentIconSprite.x = e.data.global.x;
        this._currentIconSprite.y = e.data.global.y;
    }

    private generateIcon(spriteId: number) {
        const icon = this.engine.itemModule.buildIcon(spriteId);
        this._currentIconSprite = PIXI.Sprite.from(icon);

        this._currentIconSprite.position.set(-1000, -1000);
        this.engine.app.stage.addChild(this._currentIconSprite);
    }

    private generateFloorItem(spriteId: number) {
        // this.engine.itemModule.buildFloorItem(spriteId,
        //     new Location(0, 0, 0, 0, 0, false),
        //     undefined,
        //     undefined,
        //     (furnitureItem: FurnitureItem, furniData: FurniData) => {
        //         this._currentFurnitureItem = furnitureItem;
        //         this._currentFurnitureItem.animation.hide();
        //     },
        //     true);
    }

    startFurniPlacing(virtualId: number) {
        if (this.placingFurni === true) {
            this.removeGraphicsAndStop();
        }

        if (this.placingFurniFromInventory) {
            this.core.store.commit('inventory/setInventoryDisplayed', false);
        }

        const inventoryItem = this.core.player.playerInventory.findByVirtualId(virtualId);

        if (inventoryItem === undefined) return;

        this.inventoryItem = inventoryItem;
        this.placingFurni = true;
        this.core.player.playerState.placingFurni = true;
        this._newItem = true;

        this.generateIcon(this.inventoryItem.spriteId);
        this.generateFloorItem(this.inventoryItem.spriteId);

        // this.engine.app.stage.on('pointermove', (e: PIXI.InteractionEvent) => {
        //     this.iconMoveEvent(e);
        // });
    }

    startPlacingFurniFrom(furnitureItem: FurnitureItem) {
        if (this._currentFurnitureItem !== furnitureItem) {
            this.removeGraphicsAndStop();
        }

        this.placingFurni = true;
        this.core.player.playerState.placingFurni = true;
        this._startPosition = furnitureItem.location;
        this._moveExistingItem = true;
        this._currentFurnitureItem = furnitureItem;

        this.generateIcon(furnitureItem.furniData.id);

        // this.engine.app.stage.on('pointermove', (e: PIXI.InteractionEvent) => {
        //     this.iconMoveEvent(e);
        // });
    }

    stopPlacingFurni() {
        const nextElement = this.core.player.playerInventory.findBySpriteId(this.inventoryItem.spriteId);

        if (nextElement !== undefined) {
            this.inventoryItem = nextElement;
        } else {
            this.removeGraphicsAndStop();
        }
    }

    removeGraphicsAndStop() {
        if (this.placingFurni !== true) return;

        this.placingFurni = false;
        this.core.player.playerState.placingFurni = false;
        this.inventoryItem = undefined;
        //
        // this.engine.app.stage.off('pointermove', (e: PIXI.InteractionEvent) => {
        //     this.iconMoveEvent(e);
        // });

        this.engine.app.stage.removeChild(this._currentIconSprite);

        if (this._newItem === true) {
            this._currentFurnitureItem.autoRemove();
        }

        if (this._moveExistingItem === true) {
            this._currentFurnitureItem.animation.display();
        }

        this._newItem = false;
        this._moveExistingItem = false;

        if (this.placingFurniFromInventory) {
            this.core.store.commit('inventory/setInventoryDisplayed', true);
        }
    }

    hoverTile(location: any, stackHeight: number) {
        this._currentIconSprite.alpha = 0;

        this._currentFurnitureItem.animation.ghosted();
        this._currentFurnitureItem.updateLocation(location.toMapZ(stackHeight));
    }

    loseHoverTile() {
        this._currentIconSprite.alpha = 1;

        this._currentFurnitureItem.animation.hide();
    }

    clickTile(location: any) {
        if (this._currentIconSprite.alpha === 1) {
            this.removeGraphicsAndStop();
        }

        if (this.inventoryItem !== undefined && this._newItem === true) {
            // this.core.network.socketClient.processOutgoing(new FloorItemPlacingComposer(
            //     this.inventoryItem.virtualId,
            //     location.mapX,
            //     location.mapY,
            //     this._currentFurnitureItem.direction,
            // ));
        }

        if (this._currentFurnitureItem !== undefined && this._moveExistingItem === true) {
            // this.core.network.socketClient.processOutgoing(new MoveItemComposer(
            //     this._currentFurnitureItem.itemId,
            //     location.mapX,
            //     location.mapY,
            //     this._currentFurnitureItem.direction,
            // ));

            this.removeGraphicsAndStop();
        }
    }
}

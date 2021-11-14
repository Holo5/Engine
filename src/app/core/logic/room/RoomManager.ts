import { Room } from './Room';
import { FloorItemPlacer } from './FloorItemPlacer';
import { Core } from '../../Core';
import { RoomData } from './RoomData';
import { Manager } from '../Manager';
import { CursorVisualization } from '../../graphic/objects/room/items/item-module/item/visualizations/CursorVisualization';

export class RoomManager extends Manager {
    public floorItemPlacer: FloorItemPlacer;

    private _currentRoom: Room;
    private _tileCursorVisualization: CursorVisualization;

    constructor(public core: Core) {
        super(core);

        this.floorItemPlacer = new FloorItemPlacer(core);
    }

    public newRoom() {
        this.disposeStoreEvents();

        this.core.gameManager.clear();
        this.engine.sortableContainer.clear();

        this._currentRoom = new Room(this.core);

        if (this._tileCursorVisualization === undefined) {
            this._tileCursorVisualization = this.engine.itemModule.buildTileCursor();
        }

        this._tileCursorVisualization.addInContainerAndDisplay(this.engine.sortableContainer);
    }

    public quitRoom() {
        this.core.store.commit('navigator/closeRoomInformations');
        this.core.store.commit('navigator/closeSelectedRoom');
        this.core.store.commit('navigator/cantSeeCurrentRoom');

        this.core.store.commit('roomSettings/hideRoomSettings');
        this.core.store.commit('roomSettings/setRoomDeletionConfirmDisplayed', false);

        this.core.store.commit('bottomBar/setIsInRoom', false);
    }

    public disposeStoreEvents() {
        this.core.store.commit('navigator/close');
        this.core.store.commit('navigator/closeSelectedRoom');
        this.core.store.commit('navigator/canSeeCurrentRoom');
        this.core.store.commit('navigator/emptyPadlockError');

        this.core.store.commit('doorbell/setAccessDenied', false);
        this.core.store.commit('doorbell/setPending', false);

        this.core.store.commit('roomSettings/hideRoomSettings');

        this.core.store.commit('bottomBar/setIsInRoom', true);

        this.core.store.commit('chatPanel/clearBubbles');

        this.core.store.commit('previewInteraction/close');

        // TODO: cacher la vue aérienne <-- fisdeup
    }

    public updateRoomData(roomData: RoomData): void {
        if (this.currentRoom.roomData === undefined || this.currentRoom.roomData.roomId !== roomData.roomId) {
            this.core.gameManager.historyManager.addRoomVisit(roomData.name);
        }

        const message: string = roomData.ownerId === 0 ? 'Public room...' : `Room by <i>${roomData.ownerName}</i>`;

        this.core.store.commit('room/setRoomData', roomData);
        this.core.store.commit('room/setRoomId', roomData.roomId);

        this.currentRoom.setRoomData(roomData);

        this.core.gameManager.notificationManager.sendNotification(roomData.name, message);
    }

    public clear(): void {
    }

    get currentRoom() {
        return this._currentRoom;
    }
}

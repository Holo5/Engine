import { RoomCategory } from './RoomCategory';
import { Room } from './Room';
import { Core } from '../../Core';
import { Manager } from '../Manager';
import { RoomDataRequestComposer } from '../../network/packets/outgoing/room/RoomDataRequestComposer';
import { RoomData } from '../room/RoomData';

export class NavigatorManager extends Manager {
    public roomCategories: RoomCategory[];
    public rooms: Room[];
    public forwardState: boolean;

    constructor(core: Core) {
        super(core);

        this.roomCategories = [];
        this.rooms = [];
        this.forwardState = false;
    }

    public setRoomCategories(roomCategories: RoomCategory[]): void {
        this.roomCategories = roomCategories;
        this.rooms = [];

        this.roomCategories.forEach((roomCategory) => {
            this.rooms.push(...roomCategory.rooms);
        });

        this.core.store.commit('navigator/setRoomCategories', this.roomCategories);
    }

    public runRoomCreation(): void {
        this.core.store.dispatch('roomCreation/loadCategories');
        this.core.store.dispatch('roomCreation/resetAndDisplay');
    }

    public forwardRoom(roomId: number): void {
        this.forwardState = true;

        this.core.network.socketClient.processOutgoing(new RoomDataRequestComposer(roomId));
    }

    public enterInForwardedRoom(room: Room): void {
        this.forwardState = false;

        this.core.store.dispatch('navigator/openRoom', room);
    }

    public clear(): void {
    }
}

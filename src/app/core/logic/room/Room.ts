import { Core } from '../../Core';
import { RoomModel } from './RoomModel';
import { RoomDataRequestComposer } from '../../network/packets/outgoing/room/RoomDataRequestComposer';
import { RoomData } from './RoomData';

export class Room {
    readonly roomModel: RoomModel;

    public roomData: RoomData;
    public id: number;

    constructor(public core: Core) {
        this.roomModel = new RoomModel(core.engine);
    }

    public setRoomModel(wallHeight: number, model: string) {
        this.roomModel.computeMap(wallHeight, model);

        this.core.network.socketClient.processOutgoing(new RoomDataRequestComposer(this.id));
    }

    public setRoomData(roomData: RoomData): void {
        this.roomData = roomData;
    }
}

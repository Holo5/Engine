import { Incoming } from '../Incoming';

export class RoomVisualizationSettingsMessageEvent extends Incoming {
    public process() {
        const hideWall = this.packet.readBoolean();
        const wallThick = this.packet.readInt();
        const floorThick = this.packet.readInt();

        const roomModel = this.core.gameManager.roomManager.currentRoom.roomModel;
        if (hideWall === true) {
            roomModel.hideAllWalls();
        }

        // console.log(hideWall, wallThick, floorThick);
    }
}

import { Incoming } from '../Incoming';

export class RoomHeightTileEvent extends Incoming {
    public process() {
        const roomModel = this.core.gameManager.roomManager.currentRoom.roomModel;

        const size = this.packet.readByte();
        for (let i = 0; i < size; i++) {
            const mapX = this.packet.readByte();
            const mapY = this.packet.readByte();
            const height = this.packet.readShort();

            if (height !== 16191) {
                roomModel.setHeightMap(mapX, mapY, ((height / 256 * 100) | 0) / 100);
            }
        }
    }
}

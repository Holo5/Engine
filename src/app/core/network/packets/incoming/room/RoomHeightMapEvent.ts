import { Incoming } from '../Incoming';

export class RoomHeightMapEvent extends Incoming {
    public process(): void {
        const mapXLength = this.packet.readInt();
        const mapTotalLength = this.packet.readInt();

        const roomModel = this.core.gameManager.roomManager.currentRoom.roomModel;

        for (let y = 0; y < mapTotalLength / mapXLength; y++) {
            for (let x = 0; x < mapXLength; x++) {
                const height = this.packet.readShort();
                if (height !== 16191) {
                    roomModel.setHeightMap(x, y, ((height / 256 * 100) | 0) / 100);
                }
            }
        }
    }
}

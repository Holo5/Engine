import { Vector3d } from '@holo5/roombuilder';
import { Incoming } from '../../Incoming';
import { UnitUser } from '../../../../../logic/unit/UnitUser';

export class UnitEvent extends Incoming {
    public process(): void {
        const unitLength = this.packet.readInt();

        for (let i = 0; i < unitLength; i++) {
            const userId = this.packet.readInt();
            const username = this.packet.readString();
            const motto = this.packet.readString();
            const figure = this.packet.readString();
            const unitId = this.packet.readInt();

            const positionX = this.packet.readInt();
            const positionY = this.packet.readInt();
            const positionZ = this.packet.readString();
            const positionDirection = this.packet.readInt();

            const unitType = this.packet.readInt(); // Useless for now...

            if (unitType === 1) {
                this.packet.readString(); // Useless for now...
                this.packet.readInt(); // Useless for now...
                this.packet.readInt(); // Useless for now...
                this.packet.readString(); // Useless for now...
                this.packet.readString(); // Useless for now...
                this.packet.readInt(); // Useless for now...
                this.packet.readBoolean(); // Useless for now...

                this.core.gameManager.unitManager.addUnitUser(unitId, userId, username, motto, figure, new Vector3d(positionX, positionY, parseFloat(positionZ)), positionDirection);
            } else if (unitType === 4) {
                const gender = this.packet.readString();
                const ownerId = this.packet.readInt();
                const ownerName = this.packet.readString();

                this.packet.readInt();
                this.packet.readShort();
                this.packet.readShort();
                this.packet.readShort();
                this.packet.readShort();
                this.packet.readShort();

                // let location = currentRoom.roomModel.findTileGraphicLocation(positionX, positionY);
                // location = location.toMapZ(positionZ);

                // const unitUser = new UnitUser(this.core.engine, unitId, userId, username, motto, figure, location, positionDirection);
                // currentRoom.unitManager.addUnitUser(unitUser);
                // unitUser.buildGraphic();
            }
        }
    }
}

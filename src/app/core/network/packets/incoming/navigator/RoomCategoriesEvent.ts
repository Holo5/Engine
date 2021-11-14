import { Incoming } from '../Incoming';
import { RoomCategory } from '../../../../logic/settings/RoomCategory';

export class RoomCategoriesEvent extends Incoming {
    public process(): void {
        const categoriesSize = this.packet.readInt();

        const categories: RoomCategory[] = [];

        for (let i = 0; i < categoriesSize; i++) {
            const id = this.packet.readInt();
            const publicName = this.packet.readString();
            const needToBeStaff = this.packet.readBoolean();
            const unknown = this.packet.readBoolean();
            const unknown2 = this.packet.readString();
            const unknown3 = this.packet.readString();
            const unknown4 = this.packet.readBoolean();

            const category = new RoomCategory(id, publicName, needToBeStaff);

            categories.push(category);
        }

        if (this.core.gameManager.roomManager.currentRoom) {
            this.core.gameManager.settingsManager.setCategoriesAvailable(categories);
        }
    }
}

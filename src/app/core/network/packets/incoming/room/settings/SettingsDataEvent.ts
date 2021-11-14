import { Incoming } from '../../Incoming';
import { SettingsData } from '../../../../../logic/settings/SettingsData';

export class SettingsDataEvent extends Incoming {
    public process(): void {
        const id = this.packet.readInt();
        const name = this.packet.readString();
        const description = this.packet.readString();
        const accessType = this.packet.readInt();
        const categoryId = this.packet.readInt();
        const usersMax = this.packet.readInt();
        const usersMaxCeiling = this.packet.readInt();
        const tagsLength = this.packet.readInt();
        // TODO GUIG wtf, t'es bourré ?
        const tags = this.core.gameManager.settingsManager.tags;

        for (let i = 0; i < tagsLength; i++) {
            const tag = this.packet.readString();

            tags.append(tag);
        }

        const tradeState = this.packet.readInt();
        const allowPets = this.packet.readInt() === 1;
        const allowPetsEat = this.packet.readInt() === 1;
        const allowWalkthrough = this.packet.readInt();
        const hideWalls = this.packet.readInt();
        const wallThickness = this.packet.readInt();
        const floorThickness = this.packet.readInt();
        const bubbleMode = this.packet.readInt();
        const bubbleType = this.packet.readInt();
        const bubbleScroll = this.packet.readInt();
        const chatDistance = this.packet.readInt();
        const antiFloodSettings = this.packet.readInt();
        const unknown = this.packet.readBoolean(); // ??
        const muteState = this.packet.readInt();
        const kickState = this.packet.readInt();
        const banState = this.packet.readInt();

        const roomSettingsData = new SettingsData(
            id,
            name,
            description,
            accessType,
            categoryId,
            usersMax,
            usersMaxCeiling,
            tagsLength,
            tags,
            tradeState,
            allowPets,
            allowPetsEat,
            allowWalkthrough,
            hideWalls,
            wallThickness,
            floorThickness,
            bubbleMode,
            bubbleType,
            bubbleScroll,
            chatDistance,
            antiFloodSettings,
            muteState,
            kickState,
            banState,
        );

        this.core.gameManager.settingsManager.setSettingsData(roomSettingsData);
    }
}

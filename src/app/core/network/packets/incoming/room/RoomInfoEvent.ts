import { Incoming } from '../Incoming';
import { RoomData } from '../../../../logic/room/RoomData';
import { ISpecialsInterface } from '../../../../logic/settings/interfaces/ISpecialsInterface';
import { IGroupInterface } from '../../../../logic/settings/interfaces/IGroupInterface';
import { IPromotionInterface } from '../../../../logic/settings/interfaces/IPromotionInterface';
import { Room } from '../../../../logic/navigator/Room';

export class RoomInfoEvent extends Incoming {
    public process(): void {
        const roomLoading = this.packet.readBoolean();
        const roomId = this.packet.readInt();
        const roomName = this.packet.readString();

        const ownerId = this.packet.readInt();
        const ownerName = this.packet.readString();

        const skipAccess = this.packet.readInt();
        const playerCount = this.packet.readInt();
        const maxUser = this.packet.readInt();

        const roomDescription = this.packet.readString();
        const roomTradable = this.packet.readInt();
        const roomScore = this.packet.readInt();

        const unknown1 = this.packet.readInt(); // ??
        const roomCategoryId = this.packet.readInt();

        const tagsLength = this.packet.readInt();
        const tags: string[] = [];

        for (let i = 0; i < tagsLength; i++) {
            const tag = this.packet.readString();

            tags.push(tag);
        }

        const specials = this.getRoomSpecials();
        const thumbnail = this.getRoomThumbnail(specials);
        const group = this.getRoomGroup(specials);
        const promotion = this.getRoomPromotion(specials);

        const roomData = new RoomData(
            roomLoading,
            roomId,
            roomName,
            ownerId,
            ownerName,
            skipAccess,
            playerCount,
            maxUser,
            roomDescription,
            roomTradable,
            roomScore,
            roomCategoryId,
            tagsLength,
            tags,
            specials,
            thumbnail,
            group,
            promotion,
        );

        if (this.core.gameManager.navigatorManager.forwardState) {
            const status = skipAccess === 1 ? 'knock-knock' : skipAccess === 2 ? 'password' : 'open';

            const room = new Room(
                roomId,
                roomName,
                ownerId,
                ownerName,
                0,
                maxUser,
                roomDescription,
                roomTradable === 1,
                roomScore,
                0,
                roomCategoryId,
                tags,
                thumbnail,
                status,
                group.id,
                group.name,
                group.badge,
                promotion.name,
                promotion.description,
                promotion.minutesLeft,
            );

            this.core.gameManager.navigatorManager.enterInForwardedRoom(room);
        }

        this.core.gameManager.roomManager.updateRoomData(roomData);
    }

    private getRoomSpecials(): ISpecialsInterface {
        const specials: ISpecialsInterface = {
            total: 0,
            group: false,
            promotion: false,
            allowedPets: false,
            isPublicRoom: true,
            hasThumbnail: false,
        };

        specials.total = this.packet.readInt();
        specials.group = false;
        specials.promotion = false;
        specials.allowedPets = false;
        specials.isPublicRoom = true;
        specials.hasThumbnail = false;

        if (specials.total - 16 >= 0 && specials.total - 16 <= 15) {
            specials.total -= 16;
            specials.allowedPets = true;
        }

        if (specials.total - 8 >= 0 && specials.total - 8 <= 7) {
            specials.total -= 8;
            specials.isPublicRoom = false;
        } else {
            specials.total -= 1;
        }

        if (specials.total - 4 >= 0 && specials.total - 4 <= 3) {
            specials.total -= 7;
            specials.promotion = true;
        }

        if (specials.total - 2 >= 0 && specials.total - 2 <= 1) {
            specials.total -= 3;
            specials.group = true;
        }

        if (specials.total - 1 >= 0) {
            specials.total -= 1;
            specials.hasThumbnail = true;
        }

        return specials;
    }

    private getRoomThumbnail(specials: ISpecialsInterface): string {
        if (specials.isPublicRoom || specials.hasThumbnail) {
            return this.packet.readString();
        }

        return '';
    }

    private getRoomGroup(specials: ISpecialsInterface): IGroupInterface {
        const group: IGroupInterface = {
            id: 0,
            name: '',
            badge: '',
        };

        if (specials.group) {
            group.id = this.packet.readInt();
            group.name = this.packet.readString();
            group.badge = this.packet.readString();
        }

        return group;
    }

    private getRoomPromotion(specials: ISpecialsInterface): IPromotionInterface {
        const promotion: IPromotionInterface = {
            name: '',
            description: '',
            minutesLeft: 0,
        };

        if (specials.promotion) {
            promotion.name = this.packet.readString();
            promotion.description = this.packet.readString();
            promotion.minutesLeft = this.packet.readInt();
        }

        return promotion;
    }
}

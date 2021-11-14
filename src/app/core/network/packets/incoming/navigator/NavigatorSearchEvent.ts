import { Incoming } from '../Incoming';
import { ISpecialsType } from './interface/SpecialsType';
import { Room } from '../../../../logic/navigator/Room';
import { RoomCategory } from '../../../../logic/navigator/RoomCategory';

export class NavigatorSearchEvent extends Incoming {
    public process(): void {
        const roomCategories: RoomCategory[] = [];

        const tab = this.packet.readString();
        const query = this.packet.readString();
        const totalResults = this.packet.readInt();

        for (let i = 0; i < totalResults; i++) {
            const categoryId = this.packet.readString();
            const categoryName = this.packet.readString();
            const searchableRoom = this.packet.readInt();
            const collapsed = this.packet.readBoolean();
            const viewMod = this.packet.readInt(); // REGULAR - THUMBNAILED
            const totalRooms = this.packet.readInt();

            const roomCategory = new RoomCategory(categoryId, categoryName, searchableRoom === 1, collapsed, viewMod === 1);

            for (let j = 0; j < totalRooms; j++) {
                const roomId = this.packet.readInt();
                const roomName = this.packet.readString();
                const roomUserId = this.packet.readInt();
                const roomUserName = this.packet.readString();
                const roomStatus = this.packet.readInt();
                let roomStatusState = 'open';

                if (roomStatus === 1) {
                    roomStatusState = 'knock-knock';
                } else if (roomStatus === 2) {
                    roomStatusState = 'password';
                }

                const roomUserNow = this.packet.readInt();
                const roomUserMax = this.packet.readInt();
                const roomDescription = this.packet.readString();
                const roomTradable = this.packet.readInt();
                const roomScore = this.packet.readInt();
                const roomRanking = this.packet.readInt();
                const roomCategoryId = this.packet.readInt();

                const roomTagsLength = this.packet.readInt();
                const roomTags: string[] = [];
                for (let k = 0; k < roomTagsLength; k++) {
                    roomTags.push(this.packet.readString());
                }

                const specialTypesCount = this.packet.readInt();
                const specialTypes = this.computeSpecialTypes(specialTypesCount);

                // Thumbnails
                let roomThumbnail;
                if (specialTypes.public || specialTypes.thumbnail) {
                    roomThumbnail = this.packet.readString();
                }

                // Groups
                let groupId;
                let groupTitle;
                let groupBadge;
                if (specialTypes.group) {
                    groupId = this.packet.readInt();
                    groupTitle = this.packet.readString();
                    groupBadge = this.packet.readString();
                }

                // Promotions
                let promotionName;
                let promotionDescription;
                let promotionMinutesLeft;
                if (specialTypes.promotion) {
                    promotionName = this.packet.readString();
                    promotionDescription = this.packet.readString();
                    promotionMinutesLeft = this.packet.readInt();
                }

                const room = new Room(roomId,
                    roomName,
                    roomUserId,
                    roomUserName,
                    roomUserNow,
                    roomUserMax,
                    roomDescription,
                    roomTradable === 1,
                    roomScore,
                    roomRanking,
                    roomCategoryId,
                    roomTags,
                    roomThumbnail,
                    roomStatusState,
                    groupId,
                    groupTitle,
                    groupBadge,
                    promotionName,
                    promotionDescription,
                    promotionMinutesLeft,
                );

                roomCategory.addRoom(room);
            }

            roomCategories.push(roomCategory);
        }

        this.core.gameManager.navigatorManager.setRoomCategories(roomCategories);
    }

    private computeSpecialTypes(specialTypesCount: number): ISpecialsType {
        let specialTypesCountToReduce = specialTypesCount;
        const specialsType: ISpecialsType = {
            thumbnail: false, // 1
            public: false, // 1
            group: false, // 2
            promotion: false, // 4
            private: false, // 8
            allowPets: false, // 16
        };

        if (specialTypesCountToReduce > 15) {
            specialsType.allowPets = true;
            specialTypesCountToReduce -= 16;
        }

        if (specialTypesCountToReduce > 7) {
            specialsType.private = true;
            specialTypesCountToReduce -= 8;
        }

        if (specialTypesCountToReduce > 3) {
            specialsType.promotion = true;
            specialTypesCountToReduce -= 4;
        }

        if (specialTypesCountToReduce > 1) {
            specialsType.group = true;
            specialTypesCountToReduce -= 2;
        }

        if (specialTypesCountToReduce > 0 && specialsType.private === false) {
            specialsType.public = true;
            specialTypesCountToReduce -= 1;
        }

        if (specialTypesCountToReduce > 0) {
            specialsType.thumbnail = true;
        }

        return specialsType;
    }
}

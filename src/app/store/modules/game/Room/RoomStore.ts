import { Module } from 'vuex';
import { Rating } from '../../../../core/logic/settings/Rating';
import { UserStatusType } from '../../../../core/logic/permissions/UserStatusType';
import { RoomData } from '../../../../core/logic/room/RoomData';

interface IStateInterface {
    roomData: RoomData,
    rating: Rating;
    roomId: number;
    role: string;
}

export const RoomModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        roomData: undefined,
        rating: undefined,
        roomId: null,
        role: UserStatusType.USER,
    },
    mutations: {
        setRoomData: (state: IStateInterface, roomData: RoomData) => {
            state.roomData = roomData;
        },
        setRoomId: (state: IStateInterface, roomId: number) => {
            state.roomId = roomId;
        },
        setRole: (state: IStateInterface, role: string) => {
            state.role = role;
        },
        setRating: (state: IStateInterface, rating: Rating) => {
            state.rating = rating;
        },
    },
};

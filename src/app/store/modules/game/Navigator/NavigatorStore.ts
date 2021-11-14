import { Module, Store } from 'vuex';
import { RoomCategory } from '../../../../core/logic/navigator/RoomCategory';
import { Room } from '../../../../core/logic/navigator/Room';
import { RoomEnterComposer } from '../../../../core/network/packets/outgoing/room/access/RoomEnterComposer';
import { RoomData } from '../../../../core/logic/room/RoomData';
import { RoomDataRequestComposer } from '../../../../core/network/packets/outgoing/room/RoomDataRequestComposer';

interface IStateInterface {
    navigatorDisplayed: boolean;
    roomCategories: RoomCategory[];
    selectedRoom: Room;
    displayRoomDetail: boolean;
    needKnockKnock: boolean;
    needPassword: boolean;
    currentCategory: string;
    searchQuery: string;
    roomInformationsOpened: boolean;
    currentRoom: Room;
    canSeeCurrentRoom: boolean;
    padlockError: string | boolean;
}

export const NavigationModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        navigatorDisplayed: false,
        roomCategories: [],
        selectedRoom: undefined,
        displayRoomDetail: false,
        needKnockKnock: false,
        needPassword: false,
        currentCategory: 'official_view',
        searchQuery: '',
        roomInformationsOpened: false,
        currentRoom: undefined,
        canSeeCurrentRoom: false,
        padlockError: false,
    },
    getters: {
        navigatorDisplayState: (state) => state.navigatorDisplayed,
        getRoomFromId: (state) => (roomId: number) => {
            let roomFound: Room = null;

            state.roomCategories.forEach((category: RoomCategory) => {
                if (category.rooms.find((room: Room) => room.id === roomId)) {
                    roomFound = category.getRoomById(roomId);
                }
            });

            return roomFound;
        },
    },
    actions: {
        enterInRoom: ({ commit, dispatch }, room: Room) => {
            commit('close');
            commit('closeSelectedRoom');
            commit('canSeeCurrentRoom');
            commit('emptyPadlockError');
            commit('setCurrentRoom', room);
            commit('network/composePacket', new RoomEnterComposer(room.id), { root: true });
        },
        tryPasswordPadlockedRoom: ({ commit, dispatch }, { room, password }) => {
            commit('setCurrentRoom', room);
            commit('network/composePacket', new RoomEnterComposer(room.id, password), { root: true });
        },
        closeNavigator: (context, payload) => {
            context.commit('toggleNavigator', payload);

            if (context.getters.navigatorDisplayState === true) {
                context.commit('bottomBar/hideMenu', null, { root: true });
            } else {
                context.commit('bottomBar/displayMenu', null, { root: true });
            }
        },
        openRoom: ({ commit, dispatch, rootState }, room: Room) => {
            // @ts-ignore
            const isRoomOwner = rootState.clientData.userId === room.ownerId;
            const hasRoomRights = false; // TODO: voir si l'utilisateur actuel est accrédité dans la room ou s'il est staff

            commit('setSelectedRoom', room);

            if (isRoomOwner || hasRoomRights) {
                dispatch('enterInRoom', room);
            } else if (room.status === 'knock-knock') {
                commit('displayKnockKnock', room);
            } else if (room.status === 'password') {
                commit('displayPassword', room);
            } else {
                dispatch('enterInRoom', room);
            }
        },
        forceOpenRoom: ({ commit, dispatch }, room: Room) => {
            dispatch('enterInRoom', room);
        },
        changeCategory: ({ dispatch, commit }, category: string) => {
            commit('setRoomCategories', []);
            dispatch('bridge/navigatorSearchRequest', { category, query: '' }, { root: true });
        },
        createRequest: ({ dispatch, state, commit }, query: string) => {
            commit('setRoomCategories', []);
            dispatch('bridge/navigatorSearchRequest', { category: state.currentCategory, query }, { root: true });
        },
    },
    mutations: {
        close: (state) => {
            state.navigatorDisplayed = false;
            state.displayRoomDetail = false;
        },
        toggleNavigator: (state) => {
            if (state.navigatorDisplayed) {
                state.displayRoomDetail = false;
            }

            state.navigatorDisplayed = !state.navigatorDisplayed;
        },
        setRoomCategories: (state: IStateInterface, roomCategories: RoomCategory[]) => {
            state.roomCategories = roomCategories;
        },
        setCurrentCategory: (state: IStateInterface, category: string) => {
            state.currentCategory = category;
        },
        setCurrentQuery: (state: IStateInterface, query: string) => {
            state.searchQuery = query;
        },
        setSelectedRoom: (state: IStateInterface, room: Room) => {
            state.selectedRoom = room;
        },
        closeSelectedRoom: (state: IStateInterface) => {
            state.selectedRoom = undefined;
            state.displayRoomDetail = false;
            state.needKnockKnock = false;
            state.needPassword = false;
            state.padlockError = false;
        },
        displayDetails: (state: IStateInterface, room: Room) => {
            state.displayRoomDetail = true;
            state.selectedRoom = room;
        },
        displayKnockKnock: (state: IStateInterface, room: Room) => {
            state.needKnockKnock = true;
            state.selectedRoom = room;
        },
        displayPassword: (state: IStateInterface, room: Room) => {
            state.needPassword = true;
            state.selectedRoom = room;
        },
        toggleRoomInformations: (state) => {
            state.roomInformationsOpened = !state.roomInformationsOpened;
        },
        closeRoomInformations: (state) => {
            state.roomInformationsOpened = false;
        },
        setCurrentRoom: (state: IStateInterface, room: Room) => {
            state.currentRoom = room;
        },
        emptyCurrentRoom: (state) => {
            state.currentRoom = undefined;
            state.roomInformationsOpened = false;
        },
        canSeeCurrentRoom: (state) => {
            state.canSeeCurrentRoom = true;
        },
        cantSeeCurrentRoom: (state) => {
            state.canSeeCurrentRoom = false;
        },
        setPadlockError: (state, message: string) => {
            state.padlockError = message;
        },
        emptyPadlockError: (state) => {
            state.padlockError = false;
        },
    },
};

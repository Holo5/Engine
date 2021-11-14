import { Module } from 'vuex';
import { INavigationInterface } from './Interface/INavigationInterface';
import { RoomSettingsComposer } from '../../../../core/network/packets/outgoing/room/settings/RoomSettingsComposer';
import { RoomCategoriesComposer } from '../../../../core/network/packets/outgoing/navigator/RoomCategoriesComposer';
import { SaveRoomSettingsComposer } from '../../../../core/network/packets/outgoing/room/settings/SaveRoomSettingsComposer';
import { GetBannedUsersComposer } from '../../../../core/network/packets/outgoing/room/moderation/GetBannedUsersComposer';
import { UnbanUserComposer } from '../../../../core/network/packets/outgoing/room/moderation/UnbanUserComposer';
import { UsersWithRightsComposer } from '../../../../core/network/packets/outgoing/room/settings/UsersWithRightsComposer';
import { RemoveRightsComposer } from '../../../../core/network/packets/outgoing/room/moderation/RemoveRightsComposer';
import { GiveRightsComposer } from '../../../../core/network/packets/outgoing/room/moderation/GiveRightsComposer';
import { User } from '../../../../core/logic/permissions/User';
import { RoomCategory } from '../../../../core/logic/settings/RoomCategory';
import { SettingsData } from '../../../../core/logic/settings/SettingsData';
import { UserBanned } from '../../../../core/logic/moderation/UserBanned';
import { DeleteRoomComposer } from '../../../../core/network/packets/outgoing/room/settings/DeleteRoomComposer';

interface IStateInterface {
    navigationItems: INavigationInterface[];
    roomSettingsDisplayed: boolean;
    categoryDisplayed: INavigationInterface;
    roomSettingsData: SettingsData;
    categoriesAvailable: RoomCategory[];
    roomSettingsDataLoaded: boolean;
    roomPassword: string;
    usersBanned: UserBanned[];
    usersHasRights: User[];
    roomDeletionDisplayed: boolean;
}

export const RoomSettingsModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        navigationItems: [
            { name: 'general', humanName: 'Général', layout: 'layout-general' },
            { name: 'access', humanName: 'Accès', layout: 'layout-access' },
            { name: 'rights', humanName: 'Droits', layout: 'layout-rights' },
            { name: 'advanced', humanName: 'Avancé', layout: 'layout-advanced' },
            { name: 'moderation', humanName: 'Modérer', layout: 'layout-moderation' },
        ],
        roomSettingsDisplayed: false,
        categoryDisplayed: undefined,
        roomSettingsData: undefined,
        categoriesAvailable: undefined,
        roomSettingsDataLoaded: false,
        roomPassword: '',
        usersBanned: [],
        usersHasRights: [],
        roomDeletionDisplayed: false,
    },
    actions: {
        getUsersBanned: ({ commit }) => {
            commit('network/composePacket', new GetBannedUsersComposer(), { root: true });
        },
        unbanUser: ({ commit }, user: UserBanned) => {
            commit('network/composePacket', new UnbanUserComposer(user.id), { root: true });
        },
        getUsersWithRights: ({ commit }, roomId: number) => {
            commit('network/composePacket', new UsersWithRightsComposer(roomId), { root: true });
        },
        removeUserRights: ({ commit }, user: User) => {
            commit('network/composePacket', new RemoveRightsComposer(user.id), { root: true });
        },
        giveRights: ({ commit }, userId: number) => {
            commit('network/composePacket', new GiveRightsComposer(userId), { root: true });
        },
        setRoomSettingsData: ({ commit }, room: SettingsData) => {
            commit('setRoomSettingsData', room);
            commit('displayFirstCategory');
            commit('displayRoomSettings');
            commit('setSettingsDataLoaded');
        },
        loadRoomSettingsData: ({ commit }, roomId: number) => {
            commit('hideRoomSettings');
            commit('setSettingsDataNotLoaded');
            commit('network/composePacket', new RoomCategoriesComposer(), { root: true });
            commit('network/composePacket', new RoomSettingsComposer(roomId), { root: true });
        },
        saveRoomSettings: ({ state, commit }) => {
            commit('network/composePacket', new SaveRoomSettingsComposer(
                state.roomSettingsData.id,
                state.roomSettingsData.name,
                state.roomSettingsData.description,
                state.roomSettingsData.accessType,
                state.roomPassword,
                state.roomSettingsData.usersMax,
                state.roomSettingsData.categoryId,
                state.roomSettingsData.tagsLength,
                state.roomSettingsData.tags,
                state.roomSettingsData.tradeState,
                state.roomSettingsData.allowPets,
                state.roomSettingsData.allowPetsEat,
                state.roomSettingsData.allowWalkthrough,
                state.roomSettingsData.hideWalls,
                state.roomSettingsData.wallThickness,
                state.roomSettingsData.floorThickness,
                state.roomSettingsData.muteState,
                state.roomSettingsData.kickState,
                state.roomSettingsData.banState,
                state.roomSettingsData.bubbleMode,
                state.roomSettingsData.bubbleType,
                state.roomSettingsData.bubbleScroll,
                state.roomSettingsData.chatDistance,
                state.roomSettingsData.antiFloodSettings,
            ), { root: true });
        },
        deleteRoom: ({ commit }) => {
            commit('network/composePacket', new DeleteRoomComposer(), { root: true });
        },
    },
    mutations: {
        // Module
        displayRoomSettings: (state: IStateInterface) => {
            state.roomSettingsDisplayed = true;
        },
        hideRoomSettings: (state: IStateInterface) => {
            state.roomSettingsDisplayed = false;
        },

        // Module navigation
        displayCategory: (state: IStateInterface, item: INavigationInterface) => {
            state.categoryDisplayed = item;
        },
        displayFirstCategory: (state: IStateInterface) => {
            state.categoryDisplayed = state.navigationItems[0];
        },

        // Room settings
        setRoomSettingsData: (state: IStateInterface, data: SettingsData) => {
            state.roomSettingsData = data;
        },
        setSettingsDataNotLoaded: (state: IStateInterface) => {
            state.roomSettingsDataLoaded = false;
        },
        setSettingsDataLoaded: (state: IStateInterface) => {
            state.roomSettingsDataLoaded = true;
        },

        // Room settings data
        setRoomName: (state: IStateInterface, name: string) => {
            state.roomSettingsData.name = name;
        },
        setRoomDesc: (state: IStateInterface, desc: string) => {
            state.roomSettingsData.description = desc;
        },
        setUsersMax: (state: IStateInterface, usersMax: number) => {
            state.roomSettingsData.usersMax = usersMax;
        },
        setTradeState: (state: IStateInterface, tradeState: number) => {
            state.roomSettingsData.tradeState = tradeState;
        },
        setAllowWalkthrough: (state: IStateInterface, allowWalkthrough: number) => {
            state.roomSettingsData.allowWalkthrough = allowWalkthrough;
        },
        setRoomPassword: (state: IStateInterface, password: string) => {
            state.roomPassword = password;
        },
        setAccessType: (state: IStateInterface, accessType: number) => {
            state.roomSettingsData.accessType = accessType;
        },
        setAllowPets: (state: IStateInterface, allowPets: boolean) => {
            state.roomSettingsData.allowPets = allowPets;
        },
        setAllowPetsEat: (state: IStateInterface, allowPetsEat: boolean) => {
            state.roomSettingsData.allowPetsEat = allowPetsEat;
        },
        setWallsInvisible: (state: IStateInterface, hideWalls: number) => {
            state.roomSettingsData.hideWalls = hideWalls;
        },
        setWallThickness: (state: IStateInterface, thickness: number) => {
            state.roomSettingsData.wallThickness = thickness;
        },
        setFloorThickness: (state: IStateInterface, thickness: number) => {
            state.roomSettingsData.floorThickness = thickness;
        },
        setBubbleType: (state: IStateInterface, type: number) => {
            state.roomSettingsData.bubbleType = type;
        },
        setBubbleMode: (state: IStateInterface, mode: number) => {
            state.roomSettingsData.bubbleMode = mode;
        },
        setBubbleScroll: (state: IStateInterface, scroll: number) => {
            state.roomSettingsData.bubbleScroll = scroll;
        },
        setAntiFlood: (state: IStateInterface, antiflood: number) => {
            state.roomSettingsData.antiFloodSettings = antiflood;
        },
        setChatDistance: (state: IStateInterface, distance: number) => {
            state.roomSettingsData.chatDistance = distance;
        },
        setMuteState: (state: IStateInterface, muteState: number) => {
            state.roomSettingsData.muteState = muteState;
        },
        setKickState: (state: IStateInterface, kickState: number) => {
            state.roomSettingsData.kickState = kickState;
        },
        setBanState: (state: IStateInterface, banState: number) => {
            state.roomSettingsData.banState = banState;
        },
        setUsersBanned: (state: IStateInterface, users: UserBanned[]) => {
            state.usersBanned = users;
        },

        // Room category
        setCategoriesAvailable: (state: IStateInterface, categories: RoomCategory[]) => {
            state.categoriesAvailable = categories;
        },
        setRoomCategoryId: (state: IStateInterface, id: number) => {
            state.roomSettingsData.categoryId = id;
        },

        // Users has rights
        setUsersHasRights: (state: IStateInterface, users: User[]) => {
            state.usersHasRights = users;
        },

        // Room deletion
        setRoomDeletionConfirmDisplayed: (state: IStateInterface, displayed: boolean) => {
            state.roomDeletionDisplayed = displayed;
        },
    },
};

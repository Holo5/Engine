import { Module } from 'vuex';
import { CanCreateRoomComposer } from '../../../../core/network/packets/outgoing/navigator/CanCreateRoomComposer';
import { CreateRoomComposer } from '../../../../core/network/packets/outgoing/navigator/CreateRoomComposer';
import { RoomCategory } from '../../../../core/logic/settings/RoomCategory';
import { RoomCategoriesComposer } from '../../../../core/network/packets/outgoing/navigator/RoomCategoriesComposer';
import { IRCModel } from './interfaces/IRCModel';

interface IStateInterface {
    roomCreationDisplayed: boolean;
    modelIndex: number;
    roomModel: string;
    roomName: string;
    roomNameError: boolean;
    roomDesc: string;
    categoriesAvailable: RoomCategory[];
    categoryId: number;
    usersMax: number;
    tradeState: number;
}

export const RoomCreationModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        roomCreationDisplayed: false,
        modelIndex: 0,
        roomModel: 'model_a',
        roomName: '',
        roomNameError: false,
        roomDesc: '',
        categoriesAvailable: null,
        categoryId: 1,
        usersMax: 5,
        tradeState: 1,
    },
    actions: {
        start: ({ commit }) => {
            commit('network/composePacket', new CanCreateRoomComposer(), { root: true });
        },
        loadCategories: ({ commit }) => {
            commit('network/composePacket', new RoomCategoriesComposer(), { root: true });
        },
        reset: ({ commit }) => {
            commit('setRoomName', '');
            commit('setRoomNameError', false);
            commit('setRoomDesc', '');
            commit('setModel', { index: 0, modelName: 'model_a' });
            commit('setRoomCategoryId', 1);
            commit('setUsersMax', 5);
            commit('setTradeState', 1);
        },
        resetAndHide: ({ commit, dispatch }) => {
            dispatch('reset');
            commit('close');
        },
        resetAndDisplay: ({ commit, dispatch }) => {
            dispatch('reset');
            commit('display');
        },
        create: ({ state, commit }) => {
            if (state.roomName.trim() === '') {
                commit('setRoomNameError', true);
            } else {
                commit('network/composePacket', new CreateRoomComposer(
                    state.roomName,
                    state.roomDesc,
                    state.roomModel,
                    state.categoryId,
                    state.usersMax,
                    state.tradeState,
                ), { root: true });
            }
        },
    },
    mutations: {
        close: (state: IStateInterface) => {
            state.roomCreationDisplayed = false;
        },
        display: (state: IStateInterface) => {
            state.roomCreationDisplayed = true;
        },
        setModel: (state: IStateInterface, model: IRCModel) => {
            state.modelIndex = model.index;
            state.roomModel = model.modelName;
        },
        setRoomName: (state: IStateInterface, value: string) => {
            state.roomName = value;
        },
        setRoomDesc: (state: IStateInterface, value: string) => {
            state.roomDesc = value;
        },
        setRoomCategoryId: (state: IStateInterface, value: number) => {
            state.categoryId = value;
        },
        setCategoriesAvailable: (state: IStateInterface, categories: RoomCategory[]) => {
            state.categoriesAvailable = categories;
        },
        setUsersMax: (state: IStateInterface, usersMax: number) => {
            state.usersMax = usersMax;
        },
        setTradeState: (state: IStateInterface, tradeState: number) => {
            state.tradeState = tradeState;
        },
        setRoomNameError: (state: IStateInterface, error: boolean) => {
            state.roomNameError = error;
        },
    },
};

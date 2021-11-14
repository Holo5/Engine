import { Module } from 'vuex';

interface IItemDataState {
    displayName: string,
    color: string
}

export interface IStateInterface {
    itemData: IItemDataState,
    display: boolean,
    graphic: string,
    name: string,
    description: string,
    displaySize: 's' | 'm'
}

export const ProductInteractionModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        itemData: null,
        display: false,
        graphic: undefined,
        name: undefined,
        description: undefined,
        displaySize: 'm',
    },
    mutations: {
        setData: (state, payload: { itemData: IItemDataState, graphic: string, name: string, description: string, size: 's' | 'm' }) => {
            state.display = true;
            state.itemData = payload.itemData;
            state.graphic = payload.graphic;
            state.name = payload.name;
            state.description = payload.description;
            state.displaySize = payload.size;
        },
        close: (state) => {
            state.display = false;
            state.itemData = null;
            state.graphic = undefined;
            state.name = undefined;
            state.description = undefined;
        },
    },
};

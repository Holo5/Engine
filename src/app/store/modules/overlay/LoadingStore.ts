import { Module } from 'vuex';

interface IStateInterface {
    gameLoading: boolean;
    loadingProgress: string;
}

export const LoadingModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        gameLoading: true,
        loadingProgress: 'Hello, you.',
    },
    mutations: {
        setLoadingProgress: (state: IStateInterface, value: string) => {
            state.loadingProgress = value;
        },
        endingLoading: (state: IStateInterface) => {
            state.gameLoading = false;
        },
        startLoading: (state: IStateInterface) => {
            state.gameLoading = true;
        },
    },
};

import { Module } from 'vuex';

interface IStateInterface {
    menuDisplayed: boolean;
    isInRoom: boolean;
}

export const BottomBarModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        menuDisplayed: true,
        isInRoom: false,
    },
    mutations: {
        hideMenu: (state) => {
            state.menuDisplayed = false;
        },
        displayMenu: (state) => {
            state.menuDisplayed = true;
        },
        setIsInRoom: (state: IStateInterface, isInRoom: boolean) => {
            state.isInRoom = isInRoom;
        },
    },
};

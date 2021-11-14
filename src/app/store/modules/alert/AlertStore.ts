import { Module } from 'vuex';

interface IStateInterface {
    displayingAlert: boolean;
}

export const AlertModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        displayingAlert: false,
    },
};

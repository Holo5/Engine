import { Module } from 'vuex';
import { Popup } from '../../../core/logic/notification/Popup';

interface IStateInterface {
    alerts: Popup[];
}

export const PopupAlertModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        alerts: [],
    },
    mutations: {
        addAlert: (state: IStateInterface, popup: Popup) => {
            state.alerts.push(popup);
        },
        removeAlert: (state: IStateInterface, index: number) => {
            state.alerts = state.alerts.filter((alert: Popup) => alert.index !== index);
        },
    },
};

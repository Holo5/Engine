import { Module } from 'vuex';
import { INotification } from './interfaces/INotification';

interface IStateInterface {
    count: number;
    notifications: INotification[];
}

export const NotificationModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        count: 0,
        notifications: [],
    },
    mutations: {
        addMessage: (state, payload: { title: string, message: string }) => {
            state.notifications.push({
                id: state.count++,
                icon: undefined,
                title: payload.title,
                message: payload.message,
            });
        },
        enterRoom: (state, payload: { title: string, description: string }) => {
            state.notifications.push({
                id: state.count++,
                icon: 'entering-room',
                title: payload.title,
                message: payload.description,
            });
        },
        deleteNotification: (state, payload: number) => {
            const notification = state.notifications.find((value: INotification) => value.id === payload);

            if (notification !== undefined) {
                state.notifications.splice(state.notifications.indexOf(notification), 1);
            }
        },
    },
};

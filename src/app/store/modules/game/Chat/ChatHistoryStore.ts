import { Module } from 'vuex';
import { HistoryLine } from '../../../../core/logic/history/HistoryLine';

interface IStateInterface {
    chatHistoryDisplayed: boolean;
    messages: HistoryLine[];
}

export const ChatHistoryModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        chatHistoryDisplayed: false,
        messages: [],
    },
    actions: {
        publishMessage: ({ commit }, message: HistoryLine) => {
            commit('addMessage', message);
        },
    },
    mutations: {
        toggleChatHistory: (state) => {
            state.chatHistoryDisplayed = !state.chatHistoryDisplayed;
        },
        addMessage: (state, message: HistoryLine) => {
            state.messages.push(message);
        },
    },
};

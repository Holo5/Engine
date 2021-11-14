import { Module } from 'vuex';

interface IStateInterface {
    bubble: number
    flood: number,
    floodInterval: NodeJS.Timeout,
    bubbleSelectorMenuDisplayed: boolean,
    message: string;
    tempMessage: string;
}

export const ChatBarModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        bubble: 0,
        flood: 0,
        floodInterval: null,
        bubbleSelectorMenuDisplayed: false,
        message: '',
        tempMessage: '',
    },
    actions: {
        sendChat: ({ dispatch, state, commit }) => {
            dispatch('bridge/sendMessage', { message: state.message, bubble: state.bubble }, { root: true });
        },
        userIsFlood: ({ state, commit }, seconds: number) => {
            if (state.flood <= 0) {
                commit('setFlood', seconds);

                state.floodInterval = setInterval(() => {
                    commit('setFlood', state.flood - 1);
                }, 1000);
            }
        },
    },
    mutations: {
        setFlood: (state: IStateInterface, floodTime: number) => {
            if (floodTime <= 0) {
                clearInterval(state.floodInterval);
            }

            state.flood = floodTime;
        },
        toggleBubbleSelectorMenu: (state: IStateInterface) => {
            state.bubbleSelectorMenuDisplayed = !state.bubbleSelectorMenuDisplayed;
        },
        setBubble: (state: IStateInterface, bubbleId: number) => {
            state.bubble = bubbleId;
        },
        setMessage: (state: IStateInterface, message: string) => {
            state.message = message;
        },
        setTempMessage: (state: IStateInterface, message: string) => {
            state.tempMessage = message;
        },
    },
};

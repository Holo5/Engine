import { Module } from 'vuex';
import { ChatBubble } from '../../../../core/logic/chat/ChatBubble';
import { Bubble } from './interfaces/IBubble';

interface IStateInterface {
    panelWidth: number,
    panelHeight: number,
    bubbleCount: number,
    bubbles: Bubble[],
    inited: boolean,
    toUpInterval: NodeJS.Timeout,
}

export const ChatPanelModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        panelWidth: 0,
        panelHeight: 250,
        bubbleCount: 0,
        bubbles: [],
        inited: false,
        toUpInterval: null,
    },
    mutations: {
        setPanelWidth: (state: IStateInterface, width: number) => {
            state.panelWidth = width;
        },
        addChatBubble: (state: IStateInterface, bubble: Bubble) => {
            state.bubbles.push(bubble);
        },
        incrementCount: (state: IStateInterface) => {
            state.bubbleCount += 1;
        },
        clearBubbles: (state: IStateInterface) => {
            state.bubbles = [];
            state.bubbleCount = 0;
        },
    },
    actions: {
        addBubble: ({ state, commit }, bubble: ChatBubble) => {
            commit('addChatBubble', {
                id: state.bubbleCount,
                top: state.panelHeight,
                left: bubble.unitPositionScreenX,
                parentWidth: state.panelWidth,
                bubble,
            });

            commit('incrementCount');
        },
        upEveryBubble: ({ state, commit, dispatch }, newBubble: Bubble) => {
            const bubbles = state.bubbles;

            bubbles.forEach((bubble) => {
                if (newBubble === undefined) {
                    bubble.top -= bubble.rect.height;
                } else {
                    bubble.top -= newBubble.rect.height;
                }
            });

            dispatch('relaunchInterval');
        },
        initChatPanel: ({ dispatch, state, commit }) => {
            if (state.inited === false) {
                dispatch('relaunchInterval');

                state.inited = true;
            } else {
                commit('clearBubbles');
            }
        },
        relaunchInterval: ({ state, dispatch }) => {
            clearInterval(state.toUpInterval);

            state.toUpInterval = setInterval(() => {
                dispatch('upEveryBubble', undefined);
            }, 4000);
        },
    },
};

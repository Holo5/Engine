import { Module } from 'vuex';
import { LetUserInComposer } from '../../../../core/network/packets/outgoing/room/access/LetUserInComposer';
import { Room } from '../../../../core/logic/navigator/Room';

interface IStateInterface {
    pendingDisplayed: boolean;
    requestsDisplayed: boolean;
    accessDeniedDisplayed: boolean;
    roomName: string;
    usersRinging: string[];
}

export const DoorbellModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        pendingDisplayed: false,
        requestsDisplayed: false,
        accessDeniedDisplayed: false,
        roomName: undefined,
        usersRinging: [],
    },
    actions: {
        startPending: ({ commit, dispatch }, room: Room) => {
            commit('setRoomName', room.name);
            commit('setPending', true);

            dispatch('navigator/forceOpenRoom', room, { root: true });
            commit('navigator/close', null, { root: true });
            commit('navigator/cantSeeCurrentRoom', null, { root: true });
            commit('navigator/closeSelectedRoom', null, { root: true });

            // TODO: quitter la room et afficher un écran noir
        },
        cancelPending: ({ commit }) => {
            commit('setPending', false);

            // TODO: Afficher la vue aérienne donc quitter la room
        },
        letUserIn: ({ commit, dispatch }, username: string) => {
            commit('network/composePacket', new LetUserInComposer(username, true), { root: true });
            dispatch('removeUser', username);
        },
        declineUserIn: ({ commit, dispatch }, username: string) => {
            commit('network/composePacket', new LetUserInComposer(username, false), { root: true });
            dispatch('removeUser', username);
        },
        removeUser: ({ state, commit }, username: string) => {
            commit('removeUserRinging', username);

            if (state.usersRinging.length <= 0) {
                commit('setDisplayRequests', false);
            }
        },
    },
    mutations: {
        setPending: (state: IStateInterface, pending: boolean) => {
            state.pendingDisplayed = pending;
        },
        setAccessDenied: (state: IStateInterface, accessDenied: boolean) => {
            state.accessDeniedDisplayed = accessDenied;
        },
        setDisplayRequests: (state: IStateInterface, display: boolean) => {
            state.requestsDisplayed = display;
        },
        setRingingUsers: (state: IStateInterface, users: string[]) => {
            state.usersRinging = users;
        },
        setRoomName: (state: IStateInterface, roomName: string) => {
            state.roomName = roomName;
        },
        removeUserRinging: (state: IStateInterface, username: string) => {
            state.usersRinging = state.usersRinging.filter((user) => user !== username);
        },
    },
};

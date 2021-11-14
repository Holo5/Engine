import { Module } from 'vuex';
import { Friend } from '../../../../core/logic/console/Friend';
import { InitializeFriendListComposer } from '../../../../core/network/packets/outgoing/messenger/InitializeFriendListComposer';
import { RequestUser } from '../../../../core/logic/console/RequestUser';
import { AcceptFriendshipComposer } from '../../../../core/network/packets/outgoing/messenger/AcceptFriendshipComposer';
import { DeclineFriendshipComposer } from '../../../../core/network/packets/outgoing/messenger/DeclineFriendshipComposer';
import { SearchUserComposer } from '../../../../core/network/packets/outgoing/messenger/SearchUserComposer';
import { SearchedUser } from '../../../../core/logic/console/SearchedUser';
import { RequestFriendshipComposer } from '../../../../core/network/packets/outgoing/messenger/RequestFriendshipComposer';
import { FollowFriendComposer } from '../../../../core/network/packets/outgoing/messenger/FollowFriendComposer';

interface IStateInterface {
    friends: Friend[];
    consoleDisplayed: boolean;
    currentLayout: 'friends' | 'textamigos' | 'searched';
    requestsUsers: RequestUser[];
    searchedUsers: SearchedUser[];
    searchValue: string;
    friendRequestsSent: string[];
}

export const ConsoleModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        friends: [],
        consoleDisplayed: false,
        currentLayout: 'friends',
        requestsUsers: [],
        searchedUsers: [],
        searchValue: '',
        friendRequestsSent: [],
    },
    getters: {
        friendsUnduplicated: (state) => {
            const users: Friend[] = [];
            const usersAdded: number[] = [];

            state.friends.forEach((user: Friend) => {
                if (!usersAdded.includes(user.id)) {
                    users.push(user);
                    usersAdded.push(user.id);
                }
            });

            return users;
        },
        requestsUsersUnduplicated: (state) => {
            const users: RequestUser[] = [];
            const usersAdded: number[] = [];

            state.requestsUsers.forEach((user: RequestUser) => {
                if (!usersAdded.includes(user.id)) {
                    users.push(user);
                    usersAdded.push(user.id);
                }
            });

            return users;
        },
    },
    actions: {
        getFriendsList: ({ commit }) => {
            commit('network/composePacket', new InitializeFriendListComposer(), { root: true });
        },
        searchUser: ({ state, commit }) => {
            commit('network/composePacket', new SearchUserComposer(state.searchValue), { root: true });
        },
        acceptFriendRequests: ({ commit }, usersId: number[]) => {
            commit('network/composePacket', new AcceptFriendshipComposer(usersId), { root: true });

            usersId.forEach((id: number) => {
                commit('profile/updateFriendRequestState', { state: 3, from: 'id', id }, { root: true });
            });
        },
        declineFriendRequests: ({ state, commit }, userId: number) => {
            commit('network/composePacket', new DeclineFriendshipComposer(userId), { root: true });
            commit('profile/updateFriendRequestState', { state: 1, from: 'id', id: userId }, { root: true });
            commit('removeRequestUser', userId);
        },
        declineAllFriendRequests: ({ state, commit }) => {
            commit('network/composePacket', new DeclineFriendshipComposer(true), { root: true });

            state.requestsUsers.forEach((user: RequestUser) => {
                commit('profile/updateFriendRequestState', { state: 1, from: 'id', id: user.id }, { root: true });
            });

            commit('setRequestsUsers', []);
        },
        newFriendRequest: ({ state, commit }, username: string) => {
            commit('network/composePacket', new RequestFriendshipComposer(username), { root: true });
            commit('addRequestSent', username);
            commit('profile/updateFriendRequestState', { state: 2, from: 'username', username }, { root: true });
        },
        followFriend: ({ commit }, friendId: number) => {
            commit('network/composePacket', new FollowFriendComposer(friendId), { root: true });
        },
    },
    mutations: {
        setConsoleDisplayed: (state: IStateInterface, display: boolean) => {
            state.consoleDisplayed = display;
        },
        setFriends: (state: IStateInterface, friends: Friend[]) => {
            state.friends = friends;
        },
        setCurrentLayout: (state: IStateInterface, layout: 'friends' | 'textamigos' | 'searched') => {
            state.currentLayout = layout;
        },
        setRequestsUsers: (state: IStateInterface, users: RequestUser[]) => {
            state.requestsUsers = users;
        },
        addRequestsUsers: (state: IStateInterface, user: RequestUser) => {
            const userAlreadyInList = state.requestsUsers.find((u: RequestUser) => u.id !== user.id);

            if (!userAlreadyInList) {
                state.requestsUsers.push(user);
            }
        },
        removeRequestUser: (state: IStateInterface, userId: number) => {
            state.requestsUsers = state.requestsUsers.filter((user: RequestUser) => user.id !== userId);
        },
        setSearchedUsers: (state: IStateInterface, users: SearchedUser[]) => {
            state.searchedUsers = users;
        },
        setSearchValue: (state: IStateInterface, value: string) => {
            state.searchValue = value;
        },
        addRequestSent: (state: IStateInterface, username: string) => {
            state.friendRequestsSent.push(username);
        },
    },
};

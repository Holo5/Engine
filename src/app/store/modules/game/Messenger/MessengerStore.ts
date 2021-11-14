import { Module } from 'vuex';
import { Discussion } from '../../../../core/logic/messenger/Discussion';
import { Friend } from '../../../../core/logic/console/Friend';
import { Message } from '../../../../core/logic/messenger/Message';
import { PrivateChatComposer } from '../../../../core/network/packets/outgoing/messenger/PrivateChatComposer';
import { InviteFriendComposer } from '../../../../core/network/packets/outgoing/messenger/InviteFriendComposer';
import { ESystemMessages } from './enum/ESystemMessage';

interface IStateInterface {
    messengerDisplayed: boolean;
    discussions: Discussion[];
    currentDiscussionIndex: number;
    consoleFriends: Friend[];
    writeMessageFocused: boolean;
    flood: boolean;
    groupMessageDisplayed: boolean;
    groupMessageFriends: Friend[];
}

export const MessengerModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        messengerDisplayed: false,
        discussions: [],
        currentDiscussionIndex: 0,
        consoleFriends: [],
        writeMessageFocused: false,
        flood: false,
        groupMessageDisplayed: false,
        groupMessageFriends: [],
    },
    getters: {
        discussionsFriendsList: (state): Friend[] => {
            const friends: Friend[] = [];

            for (let i = 0; i < state.discussions.length; i++) {
                const friend: Friend = state.discussions[i].user;

                friends.push(friend);
            }

            return friends;
        },
        discussions: (state) => state.discussions,
        currentDiscussion: (state): Discussion => state.discussions[state.currentDiscussionIndex],
        hasDiscussionsOpened: (state): boolean => state.discussions.length > 0,
    },
    actions: {
        initMessenger: ({ state, commit }) => {
            if (state.discussions.length > 0) {
                commit('setMessengerDisplayed', !state.messengerDisplayed);
            }
        },
        createDiscussion: ({ state, dispatch, commit }, friendId: number) => {
            const friend = state.consoleFriends.filter((f: Friend) => f.id === friendId)[0];
            const friendAlreadyMessagedMe = state.discussions.filter((discussion: Discussion) => discussion.user.id === friend.id).length > 0;
            let scrollIndex = state.discussions.length;

            if (!friendAlreadyMessagedMe) {
                const discussion = new Discussion(friend);

                commit('addDiscussion', discussion);
                dispatch('addSystemMessage', { friendId: friend.id, message: ESystemMessages.NEW_DISCUSSION });

                if (!friend.isOnline) {
                    dispatch('addSystemMessage', { friendId: friend.id, message: ESystemMessages.USER_IS_OFFLINE });
                }
            } else {
                for (let i = 0; i < state.discussions.length; i++) {
                    if (state.discussions[i].user.id === friend.id) {
                        scrollIndex = i;
                    }
                }
            }

            dispatch('displayDiscuss', scrollIndex);
        },
        reportDiscussion: ({ state, commit }, userId: number) => {
            // TODO: report discussion
        },
        displayDiscuss: ({ state, dispatch, commit }, index: number) => {
            commit('setDisplayedDiscussionIndex', index);
            commit('setMessengerDisplayed', true);

            dispatch('setDiscussionAsViewed', state.discussions[index]);
        },
        setDiscussionAsViewed: (context, discussion: Discussion) => {
            discussion.messages = discussion.messages.map((message: Message) => {
                if (!message.viewed) {
                    message.viewed = true;
                }

                return message;
            });
        },
        removeDiscussion: ({ state, commit }, userId: number) => {
            if (state.discussions.length - 1 <= 0) {
                commit('setMessengerDisplayed', false);
                commit('setDisplayedDiscussionIndex', 0);
            } else {
                const newIndex = state.currentDiscussionIndex - 1 < 0 ? 0 : state.currentDiscussionIndex - 1;

                commit('setDisplayedDiscussionIndex', newIndex);
            }

            commit('removeDiscussion', userId);
        },
        addSentMessage: ({ state, commit }, payload: { userId: number, message: string }) => {
            const discussion = state.discussions.filter((d: Discussion) => d.user.id === payload.userId)[0];
            const message = new Message('sent', -1, payload.message, true);

            commit('addMessageInDiscussion', { discussion, message });
            commit('network/composePacket', new PrivateChatComposer(payload.userId, payload.message), { root: true });
        },
        addReceivedMessage: ({ getters, state, commit, dispatch }, payload: { fromId: number, message: string, invitation?: boolean }) => {
            const friendAlreadyMessagedMe = state.discussions.filter((discussion: Discussion) => discussion.user.id === payload.fromId).length > 0;
            const messagetype = payload.invitation ? 'invitation' : 'received';
            const message = new Message(messagetype, payload.fromId, payload.message);

            if (friendAlreadyMessagedMe) {
                const discussion = state.discussions.filter((d: Discussion) => d.user.id === payload.fromId)[0];

                commit('addMessageInDiscussion', { discussion, message });
            } else {
                const friend = state.consoleFriends.find((f: Friend) => f.id === payload.fromId);
                const discussion = new Discussion(friend);

                commit('addDiscussion', discussion);
                dispatch('addSystemMessage', { friendId: payload.fromId, message: ESystemMessages.NEW_DISCUSSION });

                if (!friend.isOnline) {
                    dispatch('addSystemMessage', { friendId: payload.fromId, message: ESystemMessages.USER_IS_OFFLINE });
                }

                commit('addMessageInDiscussion', { discussion, message });
            }
        },
        addSystemMessage: ({ state, commit, getters }, payload: { friendId: number, message: string }) => {
            const discussion = state.discussions.filter((d: Discussion) => d.user.id === payload.friendId)[0];
            const message = new Message('system', -1, payload.message, true);

            commit('addMessageInDiscussion', { discussion, message });
        },
        addErrorMessage: ({ state, commit, getters }, payload: { friendId: number, message: string }) => {
            const discussion = state.discussions.filter((d: Discussion) => d.user.id === payload.friendId)[0];
            const message = new Message('error', -1, payload.message, true);

            commit('addMessageInDiscussion', { discussion, message });
        },
        removeLastMessage: ({ getters }) => {
            getters.currentDiscussion.messages.pop();
        },
        userFlood: ({ state }) => {
            state.flood = true;

            setTimeout(() => {
                state.flood = false;
            }, 10 * 1000);
        },
        sendGroupedMessage: ({ state, commit }, message: string) => {
            const friends = state.groupMessageFriends;

            commit('network/composePacket', new InviteFriendComposer(friends, message), { root: true });
        },
    },
    mutations: {
        setDisplayedDiscussionIndex: (state: IStateInterface, index: number) => {
            state.currentDiscussionIndex = index;
        },
        setMessengerDisplayed: (state: IStateInterface, display: boolean) => {
            state.messengerDisplayed = display;
        },
        addDiscussion: (state: IStateInterface, discussion: Discussion) => {
            state.discussions.push(discussion);
        },
        removeDiscussion: (state: IStateInterface, userId: number) => {
            state.discussions = state.discussions.filter((discussion: Discussion) => discussion.user.id !== userId);
        },
        addMessageInDiscussion: (state: IStateInterface, payload: { discussion: Discussion, message: Message }) => {
            state.discussions.forEach((discussion: Discussion) => {
                if (discussion.user.id === payload.discussion.user.id) {
                    discussion.messages.push(payload.message);
                }
            });
        },
        setFriends: (state: IStateInterface, friends: Friend[]) => {
            state.consoleFriends = friends;
        },
        focusWriteInput: (state: IStateInterface, focus: boolean = true) => {
            state.writeMessageFocused = focus;
        },
        disableDiscussion: (state: IStateInterface, friendId: number) => {
            state.discussions.forEach((discussion: Discussion) => {
                if (discussion.user.id === friendId) {
                    discussion.canSendMessage = false;
                }
            });
        },
        setGroupMessageDisplayed: (state: IStateInterface, display: boolean) => {
            state.groupMessageDisplayed = display;
        },
        setGroupMessageFriends: (state: IStateInterface, friends: Friend[]) => {
            state.groupMessageFriends = friends;
        },
    },
};

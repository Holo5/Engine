import { Module } from 'vuex';
import { Profile } from '../../../../core/logic/profile/Profile';
import { GetProfileComposer } from '../../../../core/network/packets/outgoing/user/profile/GetProfileComposer';
import { Group } from '../../../../core/logic/group/Group';
import { ERelationshipLevel } from '../../../../core/logic/profile/interfaces/ERelationshipLevel';
import { SetRelationshipComposer } from '../../../../core/network/packets/outgoing/user/profile/SetRelationshipComposer';

interface IStateInterface {
    profilePopupDisplayed: boolean,
    profile: Profile,
    group: Group,
    relationshipSelectorDisplayed: boolean,
}

export const ProfileModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        profilePopupDisplayed: false,
        profile: null,
        group: null,
        relationshipSelectorDisplayed: false,
    },
    actions: {
        viewProfile({ state, commit }, userId: number) {
            commit('network/composePacket', new GetProfileComposer(userId), { root: true });
        },
        displayProfilePopup({ dispatch, commit }, profile: Profile) {
            dispatch('bridge/setProfileDisplayed', true, { root: true });
            commit('setProfile', profile);
            commit('setRelationshipSelectorDisplayed', false);
        },
        hideProfile({ dispatch, commit }) {
            dispatch('bridge/setProfileDisplayed', false, { root: true });
            commit('setProfile', null);
        },
        viewGroup({ state, dispatch }, groupId: number) {
            dispatch('bridge/loadGroupFromProfile', groupId, { root: true });
        },
        changeRelationshipLevel({ state, commit, rootState }, relationshipLevel: ERelationshipLevel) {
            commit('network/composePacket', new SetRelationshipComposer(state.profile.id, relationshipLevel), { root: true });
        },
    },
    mutations: {
        setProfile(state: IStateInterface, profile: Profile) {
            state.profile = profile;
        },
        setProfilePopupDisplayed(state: IStateInterface, displayed: boolean) {
            state.profilePopupDisplayed = displayed;
        },
        setGroup(state: IStateInterface, group: Group) {
            state.group = group;
        },
        updateFriendRequestState(state: IStateInterface, payload: { state: number, from: string, username?: string, id?: number }) {
            if (payload.id === state.profile.id || payload.username === state.profile.username) {
                let [requestSent, isMyFriend] = [false, false];

                if (payload.state === 2) {
                    requestSent = true;
                }

                if (payload.state === 3) {
                    [requestSent, isMyFriend] = [true, true];
                }

                state.profile.requestSent = requestSent;
                state.profile.isMyFriend = isMyFriend;
            }
        },
        setRelationshipSelectorDisplayed(state: IStateInterface, displayed: boolean) {
            state.relationshipSelectorDisplayed = displayed;
        },
    },
};

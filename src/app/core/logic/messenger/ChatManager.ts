import { Core } from '../../Core';
import { Friend } from '../console/Friend';
import { InstantMessageError } from './enum/InstantMessageError';
import { MessageError } from './enum/MessageError';
import { Discussion } from './Discussion';

export class ChatManager {
    private core: Core;
    private friends: Friend[];

    constructor(core: Core) {
        this.core = core;
    }

    public receiveMessage(fromId: number, message: string): void {
        this.core.store.dispatch('messenger/addReceivedMessage', { fromId, message });
    }

    public receiveInvitationMessage(fromId: number, message: string): void {
        this.core.store.dispatch('messenger/addReceivedMessage', { fromId, message, invitation: true });
    }

    public setFriends(friends: Friend[]): void {
        this.friends = friends;

        this.core.store.commit('messenger/setFriends', friends);
    }

    public addFriend(friend: Friend) {
        this.friends.push(friend);

        this.core.store.commit('messenger/setFriends', this.friends);
    }

    public sendError(friendId: number, num: number): void {
        const message = InstantMessageError[num];

        if (num === MessageError.FLOOD) {
            this.core.store.dispatch('messenger/userFlood');
        }

        this.core.store.dispatch('messenger/removeLastMessage');
        this.core.store.dispatch('messenger/addErrorMessage', { friendId, message });
    }

    public discussionExist(friendId: number): boolean {
        const storeDiscussions = this.core.store.getters['messenger/discussions'];

        return storeDiscussions.filter((discussion: Discussion) => discussion.user.id === friendId).length > 0;
    }

    public notifyOnlineStatus(friend: Friend): void {
        const payload = {
            friendId: friend.id,
            message: `${friend.username} vient de se déconnecter.`,
        };

        if (friend.isOnline) {
            payload.message = `${friend.username} vient de se connecter.`;
        }

        this.core.store.dispatch('messenger/addSystemMessage', payload);
    }

    public notFriend(oldFriendId: number): void {
        this.core.store.commit('messenger/disableDiscussion', oldFriendId);
        this.core.store.dispatch('messenger/addErrorMessage', {
            friendId: oldFriendId,
            message: 'Tu ne peux plus envoyer de message ici.',
        });
    }
}

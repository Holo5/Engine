import { Friend } from './Friend';
import { Core } from '../../Core';
import { ChatManager } from '../messenger/ChatManager';
import { RequestUser } from './RequestUser';
import { SearchedUser } from './SearchedUser';
import { Manager } from '../Manager';

export class ConsoleManager extends Manager {
    public friends: Friend[];
    public chatManager: ChatManager;
    public requestsUsers: RequestUser[];
    public searchedUsers: SearchedUser[];

    constructor(core: Core) {
        super(core);

        this.friends = [];
        this.chatManager = new ChatManager(core);
        this.requestsUsers = [];
        this.searchedUsers = [];
    }

    public setFriends(friends: Friend[]): void {
        this.friends = friends;

        this.core.store.commit('console/setFriends', friends);
    }

    public addFriend(friend: Friend): void {
        this.friends.push(friend);

        this.core.store.commit('console/setFriends', this.friends);
    }

    public removeFriend(oldFriendId: number): void {
        this.friends = this.friends.filter((friend: Friend) => friend.id !== oldFriendId);

        this.core.store.commit('console/setFriends', this.friends);
    }

    public isMyFriend(userId: number): boolean {
        return this.friends.filter((friend: Friend) => friend.id === userId).length > 0;
    }

    public updateFriend(newFriendData: Friend): void {
        const friends = this.friends.map((friend: Friend) => {
            if (friend.id === newFriendData.id) {
                friend.username = newFriendData.username;
                friend.isOnline = newFriendData.isOnline;
                friend.isInRoom = newFriendData.isInRoom;
                friend.figure = newFriendData.figure;
                friend.motto = newFriendData.motto;
                friend.relationshipLevel = newFriendData.relationshipLevel;
            }

            return friend;
        });

        this.setFriends(friends);
    }

    public setRequestsUsers(requestsUsers: RequestUser[]): void {
        this.requestsUsers = requestsUsers;

        this.core.store.commit('console/setRequestsUsers', requestsUsers);
    }

    public addRequestUser(newRequestUser: RequestUser): void {
        this.requestsUsers.push(newRequestUser);

        this.core.store.commit('console/addRequestsUsers', newRequestUser);
    }

    public removeRequestUser(userId: number): void {
        this.requestsUsers = this.requestsUsers.filter((user: RequestUser) => user.id !== userId);

        this.core.store.commit('console/setRequestsUsers', this.requestsUsers);
    }

    public resetSearchedUsers(): void {
        this.searchedUsers = [];
    }

    public addSearchedUser(user: SearchedUser): void {
        this.searchedUsers.push(user);
    }

    public commitSearchedUsersToStore(): void {
        this.core.store.commit('console/setSearchedUsers', this.searchedUsers);
    }

    public getFriendStatusById(id: number): Friend {
        return this.friends.find((friend: Friend) => friend.id === id);
    }

    public clear(): void {
    }
}

import { UserStatusType } from './UserStatusType';
import { User } from './User';
import { Core } from '../../Core';
import { Manager } from '../Manager';

export class PermissionsManager extends Manager {
    public currentUserStatus: string;
    public usersHasRights: User[];

    constructor(public core: Core) {
        super(core);

        this.currentUserStatus = UserStatusType.USER;
        this.usersHasRights = [];
    }

    public setCurrentUserStatus(roleName: string) {
        this.currentUserStatus = roleName;

        this.core.store.commit('room/setRole', roleName);
    }

    public setUsersHasRights(users: User[]) {
        this.usersHasRights = users;

        this.core.store.commit('roomSettings/setUsersHasRights', users);
    }

    public removeUserWithRights(userId: number) {
        this.usersHasRights = this.usersHasRights.filter((user: User) => user.id !== userId);

        this.core.store.commit('roomSettings/setUsersHasRights', this.usersHasRights);
    }

    public appendUserWithRights(user: User) {
        this.usersHasRights.push(user);

        this.core.store.commit('roomSettings/setUsersHasRights', this.usersHasRights);
    }

    public userHasRights() {
        return this.currentUserStatus === UserStatusType.OWNER || this.currentUserStatus === UserStatusType.CONTROLLER;
    }

    public clear(): void {
    }
}

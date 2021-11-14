import { UserBanned } from './UserBanned';
import { Core } from '../../Core';
import { Manager } from '../Manager';

export class ModerationManager extends Manager {
    public usersBanned: UserBanned[];

    constructor(public core: Core) {
        super(core);

        this.usersBanned = [];
    }

    public setUsersBanned(users: UserBanned[]) {
        this.usersBanned = users;

        this.core.store.commit('roomSettings/setUsersBanned', users);
    }

    public unsetBannedUser(userId: number) {
        this.usersBanned = this.usersBanned.filter((user: UserBanned) => user.id !== userId);

        this.core.store.commit('roomSettings/setUsersBanned', this.usersBanned);
    }

    public clear(): void {
    }
}

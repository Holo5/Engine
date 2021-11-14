import { RoomEnterFromDoorbell } from '../../network/packets/outgoing/room/access/RoomEnterFromDoorbell';
import { Core } from '../../Core';
import { Manager } from '../Manager';

export class DoorbellManager extends Manager {
    private _pending: boolean;
    private _ringingUsers: string[];

    constructor(core: Core) {
        super(core);

        this._pending = false;
        this._ringingUsers = [];
    }

    public setPending(pending: boolean) {
        this._pending = pending;

        this.core.store.commit('doorbell/setPending', pending);
    }

    public accessAllowed() {
        this.setPending(false);

        this.core.store.commit('network/composePacket', new RoomEnterFromDoorbell());
    }

    public accessDenied() {
        this.setPending(false);

        this.core.store.commit('doorbell/setAccessDenied', true);

        // TODO: Afficher la vue aérienne ici
    }

    public addUserRinging(username: string) {
        if (this._ringingUsers.findIndex((user) => user === username) === -1) {
            this._ringingUsers.push(username);
        }

        this.core.store.commit('doorbell/setDisplayRequests', true);
        this.core.store.commit('doorbell/setRingingUsers', this._ringingUsers);
    }

    public clear(): void {
    }
}

import { Incoming } from '../../Incoming';

export class RoomErrorMessageEvent extends Incoming {
    public process(): void {
        const errorCode: number = this.packet.readInt();

        if (errorCode === -100002) { // Padlock fail
            this.core.store.commit('navigator/setPadlockError', 'Mot de passe incorrect. Merci de réessayer.');
        }
    }
}

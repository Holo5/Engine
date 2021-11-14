import { UserItemsComposer } from '../../outgoing/user/UserItemsComposer';
import { Incoming } from '../Incoming';

export class UserItemsRefreshEvent extends Incoming {
    public process(): void {
        this.core.network.socketClient.processOutgoing(new UserItemsComposer());
    }
}

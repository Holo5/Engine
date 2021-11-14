import { UserInfoComposer } from '../../outgoing/user/UserInfoComposer';
import { Incoming } from '../Incoming';

export class SecurityTicketEventOK extends Incoming {
    public process(): void {
        this.core.network.socketClient.processOutgoing(new UserInfoComposer());
    }
}

import { Incoming } from '../Incoming';

export class ClientPingEvent extends Incoming {
    public process(): void {
        // const holo5Client: Core = container.resolve(Core);
        // holo5Client.socketClient.processOutgoing(new ClientPongComposer());
    }
}

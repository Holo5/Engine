import { Core } from '../../Core';
import { Incoming } from '../packets/incoming/Incoming';
import { IncomingPacket } from '../packets/incoming/IncomingPacket';
import { Outgoing } from '../packets/outgoing/Outgoing';
import { PacketBuffer } from '../packets/incoming/PacketBuffer';
import { Configuration } from '../../../../conf';
import { Logger } from '../../../../common/logger/Logger';
import { IncomingHeader } from '../packets/incoming/IncomingHeader';
import { OutgoingHeader } from '../packets/outgoing/OutgoingHeader';

export class SocketClient {
    public core: Core;
    private _connection: WebSocket;

    constructor(core: Core) {
        this.core = core;
    }

    close() {
        this._connection.close();
    }

    public init() {
        return new Promise((resolve) => {
            this._connection = new WebSocket(Configuration.network.gameServerAddress);
            this._connection.binaryType = 'arraybuffer';

            this._connection.onopen = () => {
                this._connection.onmessage = (data) => this.onSocketData(data);
                resolve(true);
            };

            this._connection.onclose = () => {
                if (process.env.NODE_ENV === 'development') {
                    window.location.reload();
                }

                this._connection.close();
                // Holo5Store.commit("loadingOverlay/endingLoading");
                this.core.store.commit('loadingOverlay/setLoadingProgress', 'Can\'t connect to the server !');
            };
        });
    }

    public onSocketData(messageEvent: MessageEvent) {
        const buffer = new PacketBuffer(messageEvent.data);

        // TODO investigate about this...
        const packetHeader = buffer.readShort();

        if (process.env.NODE_ENV === 'development') {
            // this.log("Received", IncomingHeader[packetHeader], packetHeader);
        }

        // TODO speed up that !
        const Handler: any = this.core.network.packetManager.getHandler(packetHeader);

        Logger.debug('Received', IncomingHeader[packetHeader], packetHeader);
        if (Handler === null) {
            // Logger.debug('Received', IncomingHeader[packetHeader], packetHeader);
            return;
        }

        const instance: Incoming = new Handler(this.core);
        instance.setPacket(new IncomingPacket(packetHeader, buffer));
        try {
            instance.process();
        } catch (e) {
            Logger.error('Can\'t process packet', IncomingHeader[packetHeader]);
            throw e;
        }
    }

    public processOutgoing(outgoing: Outgoing) {
        outgoing.compose();

        Logger.debug('Send', OutgoingHeader[outgoing.packet.header], outgoing.packet.header);
        this._connection.send(outgoing.packet.buffer.toBuffer());
    }
}

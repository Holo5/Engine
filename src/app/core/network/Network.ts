import { INetwork } from '../interfaces/INetwork';
import { Core } from '../Core';
import { PacketManager } from './packets/PacketManager';
import { SocketClient } from './web-socket/SocketClient';

export class Network implements INetwork {
    public core: Core;
    public packetManager: PacketManager;
    public socketClient: SocketClient;

    public async init(core: Core) {
        this.core = core;
        this.packetManager = new PacketManager();
        this.socketClient = new SocketClient(core);

        this.packetManager.init();
        await this.socketClient.init();
    }
}

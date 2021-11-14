import { PacketManager } from '../network/packets/PacketManager';
import { SocketClient } from '../network/web-socket/SocketClient';
import { Core } from '../Core';

export interface INetwork {
    core: Core;
    socketClient: SocketClient;
    packetManager: PacketManager;

    init(core: Core): void;
}

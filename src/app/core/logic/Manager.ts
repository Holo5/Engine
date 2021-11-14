import { ICore } from '../../interfaces/ICore';
import { GameManager } from './GameManager';
import { INetwork } from '../interfaces/INetwork';
import { Outgoing } from '../network/packets/outgoing/Outgoing';
import { Engine } from '../graphic/engine/Engine';
import { HStore } from '../../store/Store';

export abstract class Manager {
    public core: ICore;
    public network: INetwork;
    public engine: Engine;
    public gameManager: GameManager;
    public store: typeof HStore;

    constructor(core: ICore) {
        this.core = core;
        this.network = core.network;
        this.engine = core.engine;
        this.gameManager = core.gameManager;
        this.store = core.store;
    }

    protected processOutgoing(outgoing: Outgoing) {
        this.network.socketClient.processOutgoing(outgoing);
    }

    abstract clear(): void;
}

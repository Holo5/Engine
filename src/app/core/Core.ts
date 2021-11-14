import { Store } from 'vuex';
import { GameManager } from './logic/GameManager';
import { Engine } from './graphic/engine/Engine';
import { Player } from './logic/client/Player';
import { TextManager } from './manager/TextManager';
import { ICore } from '../interfaces/ICore';
import { INetwork } from './interfaces/INetwork';
import { HStore } from '../store/Store';
import { SecurityTicketComposer } from './network/packets/outgoing/security/SecurityTicketComposer';
import { CheckReleaseMessageComposer } from './network/packets/outgoing/security/CheckReleaseMessageComposer';

export class Core implements ICore {
    public store: Store<typeof HStore>;
    public engine: Engine;
    public network: INetwork;
    public gameManager: GameManager;

    public textManager: TextManager;
    public player: Player;

    constructor(engine: Engine, network: INetwork) {
        this.engine = engine;
        this.network = network;

        this.textManager = new TextManager();
    }

    public plugStore(store: typeof HStore): void {
        this.store = store;
        this.gameManager = new GameManager(this);
    }

    public async init(sso: string) {
        this.store.commit('loadingOverlay/setLoadingProgress', 'Loading texts...');
        await this.textManager.init();

        this.store.commit('loadingOverlay/setLoadingProgress', 'Init game engine...');
        this.gameManager.init();
        await this.engine.init();

        this.store.commit('loadingOverlay/setLoadingProgress', 'Networking...');
        await this.network.init(this);

        this.store.commit('loadingOverlay/setLoadingProgress', 'Player loading...');

        this.store.commit('network/attachSocketClient', this.network.socketClient);

        this.player = new Player(this);

        this.network.socketClient.processOutgoing(new SecurityTicketComposer(sso));
        this.network.socketClient.processOutgoing(new CheckReleaseMessageComposer());
    }
}

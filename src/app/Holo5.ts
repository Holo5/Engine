import { Store } from 'vuex';
import * as url from 'url';
import { ICore } from './interfaces/ICore';
import { IGameInterface } from './interfaces/IGameInterface';
import { HStore } from './store/Store';

export class Holo5 {
    private _store: Store<typeof HStore>;
    private _gameInterface: IGameInterface;
    private _core: ICore;

    constructor(store: Store<typeof HStore>, gameInterface: IGameInterface, core: ICore) {
        this._store = store;
        this._gameInterface = gameInterface;
        this._core = core;
    }

    public async loadInterface() {
        this._store.commit('bridge/plugCore', this._core);
        this._core.plugStore(this._store);

        // @ts-ignore
        const params = (new URL(document.location)).searchParams;

        if (params.has('sso') || params.has('SSO')) {
            const sso = params.get('sso') || params.get('SSO');

            this._store.commit('beta/setLogged', true);
            await this._gameInterface.init(this._store);

            this.connect(sso);
        } else {
            await this._gameInterface.init(this._store);

            if (process.env.NODE_ENV === 'development') {
                this._store.dispatch('beta/login', { login: 'Pitt05', password: 'roro123456', pin: '' });
            }
        }
    }

    public connect(sso: string) {
        this._core.init(sso);
    }
}

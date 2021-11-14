import { Store } from 'vuex';
import { HStore } from '../store/Store';

export interface IGameInterface {
    init(store: Store<typeof HStore>): Promise<void>;
}

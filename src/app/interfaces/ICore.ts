import { GameManager } from '../core/logic/GameManager';
import { HStore } from '../store/Store';
import { TextManager } from '../core/manager/TextManager';

export interface ICore {
    engine: any;
    network: any;
    store: any;
    gameManager: GameManager;
    textManager: TextManager;

    plugStore(store: typeof HStore): void;

    init(sso: string): void;
}

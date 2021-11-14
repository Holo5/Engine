import { Incoming } from '../../Incoming';

export class AccessDeniedEvent extends Incoming {
    public process(): void {
        this.core.gameManager.doorbellManager.accessDenied();
    }
}

import { Incoming } from '../../Incoming';

export class AccessAllowedEvent extends Incoming {
    public process(): void {
        this.core.gameManager.doorbellManager.accessAllowed();
    }
}

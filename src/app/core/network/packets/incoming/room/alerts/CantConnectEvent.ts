import { Incoming } from '../../Incoming';
import { Popup } from '../../../../../logic/notification/Popup';

export class CantConnectEvent extends Incoming {
    process(): void {
        const errorId = this.packet.readInt();

        if (errorId === 1) {
            this.sendError(
                'Appartement rempli !',
                'L\'appartement que tu souhaites visiter n\'a plus de place pour toi... Réessaye plus tard.',
            );
        }

        if (errorId === 4) {
            this.sendError(
                'Banni :(',
                'Oh ! On dirait que le propriétaire a une dent contre toi... Essaye de t\'arranger avec lui puis tu pourras peut-être revenir.',
            );
        }

        this.core.gameManager.roomManager.quitRoom();
    }

    private sendError(title: string, message: string) {
        const popup = new Popup(title, message);

        this.core.gameManager.popupManager.addPopup(popup);
    }
}

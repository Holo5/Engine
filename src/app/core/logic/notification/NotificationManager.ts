import { Manager } from '../Manager';

export class NotificationManager extends Manager {
    public sendNotification(title: string, message: string): void {
        this.core.store.commit('notification/addMessage', { title, message });
    }

    postNotification(type: string, key: string, value: string) {
        console.log(type, key, value);
        this.manageExtraAction(type);

        if (key === 'message') {
            this.core.store.commit('notification/addMessage', { title: 'Error !', message: this.core.textManager.getMessage(value) });
        }
    }

    manageExtraAction(type: string) {
        if (type === 'furni_placement_error') {
            this.core.gameManager.roomManager.floorItemPlacer.removeGraphicsAndStop();
        }
    }

    public clear(): void {
    }
}

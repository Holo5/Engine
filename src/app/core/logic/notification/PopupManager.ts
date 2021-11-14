import { Core } from '../../Core';
import { Popup } from './Popup';
import { Manager } from '../Manager';

export class PopupManager extends Manager {
    public popups: Popup[];
    private _index: number;

    constructor(public core: Core) {
        super(core);

        this.popups = [];
        this._index = 0;
    }

    private upIndex(): number {
        this._index++;

        return this._index;
    }

    public addPopup(popup: Popup): void {
        popup.index = this.upIndex();

        this.popups.push(popup);
        this.core.store.commit('popupAlert/addAlert', popup);
    }

    public removePopupFromIndex(index: number): void {
        this.popups = this.popups.filter((popup: Popup) => popup.index !== index);
        this.core.store.commit('popupAlert/removeAlert', index);
    }

    public clear(): void {
        this.popups = [];
        this._index = 0;
    }
}

import { Core } from '../../Core';

export class PlayerCurrencies {
    private _credits: number;
    private _diamonds: number;
    private _duckets: number;
    private _seasonals: number;

    constructor(public core: Core) {
        this._credits = 0;
        this._diamonds = 0;
        this._duckets = 0;
        this._seasonals = 0;

        this.commitInStore();
    }

    set credits(value: number) {
        this._credits = value;

        this.commitInStore();
    }

    set diamonds(value: number) {
        this._diamonds = value;

        this.commitInStore();
    }

    set duckets(value: number) {
        this._duckets = value;

        this.commitInStore();
    }

    set seasonals(value: number) {
        this._seasonals = value;

        this.commitInStore();
    }

    private commitInStore(): void {
        this.core.store.commit('clientData/updateCurrencies', {
            credits: this._credits,
            diamonds: this._diamonds,
            duckets: this._duckets,
            seasonals: this._seasonals,
        });
    }
}

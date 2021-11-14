import { IStuffItem } from './interfaces/IStuffItem';

export class GiftWrappingConfiguration {
    private readonly _isEnabled: boolean;
    private readonly _price: number;
    private readonly _stuffTypes: number[];
    private readonly _boxTypes: number[];
    private readonly _ribbonTypes: number[];
    private readonly _oldStuffTypes: number[];
    private readonly _defaultStuffType: number;

    public stuffItems: IStuffItem[];

    constructor(
        isEnabled: boolean,
        price: number,
        stuffTypes: number[],
        boxTypes: number[],
        ribbonTypes: number[],
        oldStuffTypes: number[],
    ) {
        this._isEnabled = isEnabled;
        this._price = price;
        this._stuffTypes = stuffTypes;
        this._boxTypes = boxTypes;
        this._ribbonTypes = ribbonTypes;
        this._oldStuffTypes = oldStuffTypes;

        this._defaultStuffType = this.setRandomDefaultStyle();

        this.stuffItems = [];
    }

    private setRandomDefaultStyle(): number {
        if (this._stuffTypes.length < 0) {
            return 0;
        }

        return Math.floor(Math.random() * this._stuffTypes.length);
    }

    get isEnabled(): boolean {
        return this._isEnabled;
    }

    get price(): number {
        return this._price;
    }

    get stuffTypes(): number[] {
        return this._stuffTypes;
    }

    get boxTypes(): number[] {
        return this._boxTypes;
    }

    get ribbonTypes(): number[] {
        return this._ribbonTypes;
    }

    get oldStuffTypes(): number[] {
        return this._oldStuffTypes;
    }

    get defaultStuffType(): number {
        return this._defaultStuffType;
    }
}

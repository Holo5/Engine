export class CatalogItem {
    private _id: number;
    private _displayName: string;
    private _color: number | false;
    private _revision: string;
    private _credits: boolean;
    private _creditCost: number;
    private _diamonds: boolean;
    private _diamondCost: number;
    private _seasonal: boolean;
    private _seasonalCost: number;
    private _canGift: boolean;
    private _limited: boolean;
    private _itemDataName: string;

    private _hasBadge: boolean;
    private _badgeCode: string;

    constructor(
        id: number,
        displayName: string,
        color: number | false,
        revision: string,
        credits: boolean,
        creditCost: number,
        diamonds: boolean,
        diamondCost: number,
        seasonal: boolean,
        seasonalCost: number,
        canGift: boolean,
        limited: boolean,
        itemDataName: string,
        hasBadge: boolean = false,
        badgeCode: string = '',
    ) {
        this._id = id;
        this._displayName = displayName;
        this._color = color;
        this._revision = revision;
        this._credits = credits;
        this._creditCost = creditCost;
        this._diamonds = diamonds;
        this._diamondCost = diamondCost;
        this._seasonal = seasonal;
        this._seasonalCost = seasonalCost;
        this._canGift = canGift;
        this._limited = limited;
        this._itemDataName = itemDataName;
        this._hasBadge = hasBadge;
        this._badgeCode = badgeCode;
    }

    static fromDatas(
        itemId: number,
        itemDisplayName: string,
        revision: string,
        itemCostCredit: number,
        costOtherCurrency1: number,
        costOtherCurrency2: number,
        itemCanGift: boolean,
        itemLimited: boolean,
        itemDataName: string,
        hasBadge: boolean = false,
        badgeCode: string = '',
    ) {
        let color: number | false = false;
        let finalItemDisplayName = itemDisplayName;

        if (itemDisplayName.includes('*')) {
            const itemSplitedName = itemDisplayName.split('*');

            finalItemDisplayName = itemSplitedName[0];
            color = parseInt(itemSplitedName[1]);
        }

        const credits = itemCostCredit > 0;
        let seasonal = true;
        let seasonalCost = costOtherCurrency1;
        let diamonds = false;
        let diamondsCost = 0;

        if (costOtherCurrency1 > 0 && costOtherCurrency2 === 5) {
            seasonal = false;
            seasonalCost = 0;
            diamonds = true;
            diamondsCost = costOtherCurrency1;
        }

        return new CatalogItem(
            itemId,
            finalItemDisplayName,
            color,
            revision,
            credits,
            itemCostCredit,
            diamonds,
            diamondsCost,
            seasonal,
            seasonalCost,
            itemCanGift,
            itemLimited,
            itemDataName,
            hasBadge,
            badgeCode,
        );
    }

    public get id(): number {
        return this._id;
    }

    public get displayName(): string {
        return this._displayName;
    }

    public get color(): number | false {
        return this._color;
    }

    public get revision(): string {
        return this._revision;
    }

    public get credits(): boolean {
        return this._credits;
    }

    public get creditCost(): number {
        return this._creditCost;
    }

    public get diamonds(): boolean {
        return this._diamonds;
    }

    public get diamondCost(): number {
        return this._diamondCost;
    }

    public get seasonal(): boolean {
        return this._seasonal;
    }

    public get seasonalCost(): number {
        return this._seasonalCost;
    }

    public get canGift(): boolean {
        return this._canGift;
    }

    public get limited(): boolean {
        return this._limited;
    }

    public get itemDataName(): string {
        return this._itemDataName;
    }

    public get hasBadge(): boolean {
        return this._hasBadge;
    }

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get badgeUrl(): string {
        // const badgeURL: string = Configuration.images.imageDomain + 'badges/'; @todo replace it
        const badgeURL: string = 'https://swf.habbocity.me/c_images/album1584/';

        return `${badgeURL}${this.badgeCode}.gif`;
    }
}

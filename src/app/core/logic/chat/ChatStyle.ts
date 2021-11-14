import { IStyle } from './interfaces/IStyle';

export class ChatStyle {
    public id: number;
    public asset: string;
    public head: boolean;
    public isHcOnly: boolean;
    public isStaffOverrideable: boolean;
    public HTMLAllowed: boolean;
    public systemOnly: boolean;
    public ambassadorOnly: boolean;

    constructor(
        id: number,
        asset: string,
    ) {
        this.id = id;
        this.asset = asset;

        this.head = true;
        this.isHcOnly = false;
        this.isStaffOverrideable = true;
        this.HTMLAllowed = false;
        this.systemOnly = false;
        this.ambassadorOnly = false;
    }

    hideHead(): this {
        this.head = false;

        return this;
    }

    hcOnly(): this {
        this.isHcOnly = true;

        return this;
    }

    notStaffOverrideable(): this {
        this.isStaffOverrideable = false;

        return this;
    }

    allowHTML(): this {
        this.HTMLAllowed = true;

        return this;
    }

    system(): this {
        this.systemOnly = true;

        return this;
    }

    ambassador(): this {
        this.ambassadorOnly = true;

        return this;
    }

    serialize(): IStyle {
        return {
            id: this.id,
            asset: this.asset,
            head: this.head,
            isHcOnly: this.isHcOnly,
            isStaffOverrideable: this.isStaffOverrideable,
            HTMLAllowed: this.HTMLAllowed,
            ambassadorOnly: this.ambassadorOnly,
            systemOnly: this.systemOnly,
        };
    }
}

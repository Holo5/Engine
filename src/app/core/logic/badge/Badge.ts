export class Badge {
    public name: string;
    public slot: number;
    public renderer: string;
    public textName: string;
    public textDesc: string;

    constructor(
        name: string,
        slot: number,
        textName: string,
        textDesc: string,
    ) {
        this.name = name;
        this.slot = slot;
        this.textName = textName ?? `badge_name_${name}`;
        this.textDesc = textDesc ?? `badge_desc_${name}`;

        this.renderBadge();
    }

    private renderBadge(): void {
        // const badgeURL: string = Configuration.images.imageDomain + 'badges/'; @todo replace it
        const badgeURL: string = 'https://swf.habbocity.me/c_images/album1584/';

        this.renderer = `${badgeURL}${this.name}.gif`;
    }
}

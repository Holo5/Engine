export class Group {
    public id: number;
    public title: string;
    public badge: string;
    public colourA: string;
    public colourB: string;
    public favorite: boolean;
    public hasForum: boolean;

    constructor(
        id: number,
        title: string,
        badge: string,
        colourA: string,
        colourB: string,
        favorite: boolean,
        hasForum: boolean,
    ) {
        this.id = id;
        this.title = title;
        this.badge = badge;
        this.colourA = colourA;
        this.colourB = colourB;
        this.favorite = favorite;
        this.hasForum = hasForum;
    }
}
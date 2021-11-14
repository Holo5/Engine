export class Room {
    public id: number;
    public name: string;
    public ownerId: number;
    public ownerName: string;
    public usersIn: number;
    public usersMax: number;
    public description: string;
    public tradable: boolean;
    public score: number;
    public ranking: number;
    public categoryId: number;
    public tags: string[];
    public thumbnail: string;
    public status: string;

    public groupId: number;
    public groupTitle: string;
    public groupBadge: string;

    public promotionName: string;
    public promotionDescription: string;
    public promotionMinuteLeft: number;

    constructor(
        id: number,
        name: string,
        ownerId: number,
        ownerName: string,
        usersIn: number,
        usersMax: number,
        description: string,
        tradable: boolean,
        score: number,
        ranking: number,
        categoryId: number,
        tags: string[],
        thumbnail: string,
        status: string,
        groupId: number,
        groupTitle: string,
        groupBadge: string,
        promotionName: string,
        promotionDescription: string,
        promotionMinuteLeft: number,
    ) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.usersIn = usersIn;
        this.usersMax = usersMax;
        this.description = description;
        this.tradable = tradable;
        this.score = score;
        this.ranking = ranking;
        this.categoryId = categoryId;
        this.tags = tags;
        this.thumbnail = thumbnail;
        this.status = status;
        this.groupId = groupId;
        this.groupTitle = groupTitle;
        this.groupBadge = groupBadge;
        this.promotionName = promotionName;
        this.promotionDescription = promotionDescription;
        this.promotionMinuteLeft = promotionMinuteLeft;
    }
}

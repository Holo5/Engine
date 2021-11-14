import { ISpecialsInterface } from '../settings/interfaces/ISpecialsInterface';
import { IGroupInterface } from '../settings/interfaces/IGroupInterface';
import { IPromotionInterface } from '../settings/interfaces/IPromotionInterface';

export class RoomData {
    public roomLoading: boolean;
    public roomId: number;
    public name: string;
    public ownerId: number;
    public ownerName: string;
    public skipAccess: number;
    public usersIn: number;
    public usersMax: number;
    public description: string;
    public roomTradable: number;
    public score: number;
    public roomCategoryId: number;
    public tagsLength: number;
    public tags: string[];
    public specials: ISpecialsInterface;
    public thumbnail: string;
    public group: IGroupInterface;
    public promotion: IPromotionInterface;

    constructor(
        roomLoading: boolean,
        roomId: number,
        roomName: string,
        ownerId: number,
        ownerName: string,
        skipAccess: number,
        playerCount: number,
        maxUser: number,
        roomDescription: string,
        roomTradable: number,
        roomScore: number,
        roomCategoryId: number,
        tagsLength: number,
        tags: string[],
        specials: ISpecialsInterface,
        thumbnail: string,
        group: IGroupInterface,
        promotion: IPromotionInterface,
    ) {
        this.roomLoading = roomLoading;
        this.roomId = roomId;
        this.name = roomName;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.skipAccess = skipAccess;
        this.usersIn = playerCount;
        this.usersMax = maxUser;
        this.description = roomDescription;
        this.roomTradable = roomTradable;
        this.score = roomScore;
        this.roomCategoryId = roomCategoryId;
        this.tagsLength = tagsLength;
        this.tags = tags;
        this.specials = specials;
        this.thumbnail = thumbnail;
        this.group = group;
        this.promotion = promotion;
    }

    public addTag(value: string): void {
        this.tags.push(value);
    }

    public removeTag(value: string): void {
        this.tags = this.tags.filter((tag: string) => tag !== value);
    }
}

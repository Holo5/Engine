import { Group } from './Group';
import { Relationship } from './Relationship';
import { Badge } from '../badge/Badge';

export class Profile {
    public id: number;
    public username: string;
    public figure: string;
    public motto: string;
    public registerDate: string;
    public achievementPoints: number;
    public friendsCount: number;
    public isMyFriend: boolean;
    public requestSent: boolean;
    public isOnline: boolean;
    public groups: Group[];
    public badges: Badge[];
    public relationships: Relationship[];
    public totalRelationships: number;
    public totalGroups: number;

    constructor(
        id: number,
        username: string,
        figure: string,
        motto: string,
        registerDate: string,
        achievementPoints: number,
        friendsCount: number,
        isMyFriend: boolean,
        requestSent: boolean,
        isOnline: boolean,
        groups: Group[],
    ) {
        this.id = id;
        this.username = username;
        this.figure = figure;
        this.motto = motto;
        this.registerDate = registerDate;
        this.achievementPoints = achievementPoints;
        this.friendsCount = friendsCount;
        this.isMyFriend = isMyFriend;
        this.requestSent = requestSent;
        this.isOnline = isOnline;
        this.groups = groups;
        this.badges = null;
        this.relationships = null;
        this.totalRelationships = 0;
        this.totalGroups = groups === null ? 0 : groups.length;
    }

    public setBadges(badges: Badge[]) {
        this.badges = badges;
    }

    public setRelationships(relationships: Relationship[]) {
        this.relationships = relationships;
        this.totalRelationships = relationships.length;
    }
}

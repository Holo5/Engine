import { ERelationshipLevel } from '../profile/interfaces/ERelationshipLevel';

export class Friend {
    public id: number;
    public username: string;
    public isOnline: boolean;
    public isInRoom: boolean;
    public figure: string;
    public motto: string;
    public relationshipLevel: ERelationshipLevel;
    public fakeUsername: string;

    constructor(
        id: number,
        username: string,
        isOnline: boolean,
        isInRoom: boolean,
        figure: string,
        motto: string,
        relationshipLevel: ERelationshipLevel,
    ) {
        this.id = id;
        this.username = username;
        this.isOnline = isOnline;
        this.isInRoom = isInRoom;
        this.figure = figure;
        this.motto = motto;
        this.relationshipLevel = relationshipLevel;
    }
}

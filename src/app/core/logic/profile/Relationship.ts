import { ERelationshipLevel } from './interfaces/ERelationshipLevel';

export class Relationship {
    public userId: number;
    public level: ERelationshipLevel;
    public username: string;
    public figure: string;

    constructor(
        userId: number,
        level: ERelationshipLevel,
        username: string,
        figure: string,
    ) {
        this.userId = userId;
        this.level = level;
        this.username = username;
        this.figure = figure;
    }
}

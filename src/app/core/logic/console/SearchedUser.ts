export class SearchedUser {
    public id: number;
    public username: string;
    public motto: string;
    public online: boolean;
    public figure: string;
    public lastOnline: string;
    public isMe: boolean;

    public constructor(
        id: number,
        username: string,
        motto: string,
        online: boolean,
        figure: string,
        lastOnline: string,
        isMe: boolean,
    ) {
        this.id = id;
        this.username = username;
        this.motto = motto;
        this.online = online;
        this.figure = figure;
        this.lastOnline = lastOnline;
        this.isMe = isMe;
    }
}

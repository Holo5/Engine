export class RequestUser {
    public id: number;
    public username: string;
    public figure: string;

    constructor(
        id: number,
        username: string,
        figure: string,
    ) {
        this.id = id;
        this.username = username;
        this.figure = figure;
    }
}

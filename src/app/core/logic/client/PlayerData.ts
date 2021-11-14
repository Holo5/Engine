export class PlayerData {
    private _id: number;
    private _username: string;
    private _figure: string;
    private _gender: string;
    private _motto: string;
    private _dailyRespects: number;
    private _dailyPetsScratches: number;

    constructor(
        id: number,
        username: string,
        figure: string,
        gender: string,
        motto: string,
        dailyRespects: number,
        dailyPetsScratches: number,
    ) {
        this._id = id;
        this._username = username;
        this._figure = figure;
        this._gender = gender;
        this._motto = motto;
        this._dailyRespects = dailyRespects;
        this._dailyPetsScratches = dailyPetsScratches;
    }

    get id(): number {
        return this._id;
    }

    get username(): string {
        return this._username;
    }

    get figure(): string {
        return this._figure;
    }

    get gender(): string {
        return this._gender;
    }

    get motto(): string {
        return this._motto;
    }

    get dailyRespects(): number {
        return this._dailyRespects;
    }

    get dailyPetsScratches(): number {
        return this._dailyPetsScratches;
    }
}

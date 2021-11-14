export class FurniData {
    private _id: number;
    private _className: string;
    private _color: number;
    private _defaultdir: number;
    private _xdim: number;
    private _ydim: number;
    private _name: string;
    private _description: string;
    private _customparams: string;
    private _specialtype: string;
    private _canstandon: boolean;
    private _cansiton: boolean;
    private _canlayon: boolean;
    private _furniline: string;
    private _rare: boolean;

    constructor(
        id: number,
        className: string,
        defaultdir: number,
        xdim: number,
        ydim: number,
        name: string,
        description: string,
        customparams: string,
        specialtype: string,
        canstandon: boolean,
        cansiton: boolean,
        canlayon: boolean,
        furniline: string,
        rare: boolean,
    ) {
        this._id = id;
        this._defaultdir = defaultdir;
        this._xdim = xdim;
        this._ydim = ydim;
        this._name = name;
        this._description = description;
        this._customparams = customparams;
        this._specialtype = specialtype;
        this._canstandon = canstandon;
        this._cansiton = cansiton;
        this._canlayon = canlayon;
        this._furniline = furniline;
        this._rare = rare;

        if (className.includes('*')) {
            const data = className.split('*');
            this._className = data[0];
            this._color = parseInt(data[1]);
        } else {
            this._className = className;
        }
    }

    public get id(): number {
        return this._id;
    }

    public get className(): string {
        return this._className;
    }

    public get color(): number {
        return this._color;
    }

    public get defaultdir(): number {
        return this._defaultdir;
    }

    public get xdim(): number {
        return this._xdim;
    }

    public get ydim(): number {
        return this._ydim;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get customparams(): string {
        return this._customparams;
    }

    public get specialtype(): string {
        return this._specialtype;
    }

    public get canstandon(): boolean {
        return this._canstandon;
    }

    public get cansiton(): boolean {
        return this._cansiton;
    }

    public get canlayon(): boolean {
        return this._canlayon;
    }

    public get furniline(): string {
        return this._furniline;
    }

    public get rare(): boolean {
        return this._rare;
    }
}

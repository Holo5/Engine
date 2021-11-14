export class BaseFigureDataPart {
    public type: string;
    public id: string;
    public color?: string;

    constructor(type: string, id: string, color: string) {
        this.type = type;
        this.id = id;
        this.color = color;
    }

    isColored(): boolean {
        return this.color !== undefined;
    }

    public static fromValue(value: string) {
        const values = value.split('-');
        return new BaseFigureDataPart(values[0], values[1], values[2]);
    }
}

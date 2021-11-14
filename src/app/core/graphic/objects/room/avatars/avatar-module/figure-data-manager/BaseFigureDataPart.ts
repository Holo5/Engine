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
}

export class ItemPosition {
    private _x: number;
    private _y: number;
    private _z: string;
    private _direction: number;

    public constructor(x: number, y: number, z: string, direction: number) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._direction = direction;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get z(): string {
        return this._z;
    }

    set z(value: string) {
        this._z = value;
    }

    get direction(): number {
        return this._direction;
    }

    set direction(value: number) {
        this._direction = value;
    }
}

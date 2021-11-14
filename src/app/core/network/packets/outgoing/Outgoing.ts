import { OutgoingPacket } from './OutgoingPacket';

export abstract class Outgoing {
    private _header: number;
    private _packet: OutgoingPacket;
    private _isCancelled: boolean;

    constructor(header: number) {
        if (!header) {
            throw new Error('invalid_header');
        }

        this._header = header;
        this._packet = new OutgoingPacket(header);
        this._isCancelled = false;
    }

    public cancel(): OutgoingPacket {
        this._packet.cancel();

        this._isCancelled = true;

        return this._packet;
    }

    public abstract compose(): OutgoingPacket;

    public get header(): number {
        return this._header;
    }

    public get packet(): OutgoingPacket {
        return this._packet;
    }

    public get isCancelled(): boolean {
        return this._isCancelled;
    }
}

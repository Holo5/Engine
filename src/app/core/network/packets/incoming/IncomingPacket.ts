import { PacketBuffer } from './PacketBuffer';
import { IncomingHeader } from './IncomingHeader';

const ByteBuffer = require('bytebuffer');

export class IncomingPacket {
    private _header: IncomingHeader;
    private _buffer: PacketBuffer;

    public constructor(header: IncomingHeader, buffer: PacketBuffer) {
        this._header = header;
        this._buffer = buffer;
    }

    public readInt(): number {
        return this._buffer.readInt();
    }

    public readNextInt(): number {
        return this._buffer.readNextInt();
    }

    public readShort(): number {
        return this._buffer.readShort();
    }

    public readByte(): number {
        return this._buffer.readByte();
    }

    public readString(): string {
        return this._buffer.readString();
    }

    public readBoolean(): boolean {
        return !!this._buffer.readByte();
    }

    public get header(): IncomingHeader {
        return this._header;
    }
}

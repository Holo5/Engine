import { OutgoingHeader } from './OutgoingHeader';

const ByteBuffer = require('bytebuffer');

export class OutgoingPacket {
    private _byteBuffer: ByteBuffer;
    private _header: OutgoingHeader;
    private _isPrepared: boolean;
    private _isCancelled: boolean;

    constructor(header: OutgoingHeader) {
        this._header = header;
        /* global ByteBuffer */
        this._byteBuffer = new ByteBuffer();
        this._byteBuffer.writeInt(0).writeShort(header);
    }

    public writeBytes(...bytes: number[]): this {
        bytes.forEach((byte) => this._byteBuffer.writeByte(byte));
        return this;
    }

    public writeInt(...numbers: number[]): this {
        numbers.forEach((number) => this._byteBuffer.writeInt(number));
        return this;
    }

    public writeShort(...numbers: number[]): this {
        numbers.forEach((number) => this._byteBuffer.writeShort(number));
        return this;
    }

    private convertStringToBuffer(string: string) {
        const octets = [];
        const length = string.length;
        let i = 0;
        while (i < length) {
            const codePoint = string.codePointAt(i);
            let c = 0;
            let bits = 0;
            if (codePoint <= 0x0000007F) {
                c = 0;
                bits = 0x00;
            } else if (codePoint <= 0x000007FF) {
                c = 6;
                bits = 0xC0;
            } else if (codePoint <= 0x0000FFFF) {
                c = 12;
                bits = 0xE0;
            } else if (codePoint <= 0x001FFFFF) {
                c = 18;
                bits = 0xF0;
            }
            octets.push(bits | (codePoint >> c));
            c -= 6;
            while (c >= 0) {
                octets.push(0x80 | ((codePoint >> c) & 0x3F));
                c -= 6;
            }
            i += codePoint >= 0x10000 ? 2 : 1;
        }
        return octets;
    }

    public writeString(...messages: string[]): this {
        messages.forEach((message) => {
            const buffer = this.convertStringToBuffer(message);

            this._byteBuffer.writeShort(buffer.length);
            buffer.forEach((byte) => {
                this._byteBuffer.writeByte(byte);
            });
        });
        return this;
    }

    public writeBoolean(...flags: boolean[]): this {
        flags.forEach((flag) => this._byteBuffer.writeByte(flag ? 1 : 0));
        return this;
    }

    public prepare(): this {
        if (!this._isPrepared) {
            this._isPrepared = true;
        }

        const buffer = this._byteBuffer;
        buffer.writeInt(buffer.offset - 4, 0);
        this._byteBuffer = buffer.slice(0, buffer.offset);

        return this;
    }

    public cancel(): this {
        return this;
    }

    public get buffer(): ByteBuffer {
        return this._byteBuffer;
    }

    public get header(): OutgoingHeader {
        return this._header;
    }

    public get isPrepared(): boolean {
        return this._isPrepared;
    }

    public get isCancelled(): boolean {
        return this._isCancelled;
    }
}

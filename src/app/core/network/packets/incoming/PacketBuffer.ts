export class PacketBuffer {
    private buffer: any;
    private bufferSlot: number;
    private view: DataView;

    public constructor(buffer: any) {
        this.bufferSlot = 0;

        this.buffer = buffer;
        this.view = new DataView(buffer);
        const size = this.view.getInt32(this.bufferSlot) + 4;
        this.bufferSlot += 4;
        if (size > this.buffer.length) {
            console.log('SNK WS: incoming packet: Incomplete.');
        }
    }

    clear() {
        this.buffer = null;
        this.bufferSlot = 0;
        this.view = null;
    }

    readInt(): number {
        const result = this.view.getInt32(this.bufferSlot);
        this.bufferSlot += 4;
        return result;
    }

    readNextInt(): number {
        const result = this.view.getInt32(this.bufferSlot);
        return result;
    }

    readChar(): string {
        const result = this.view.getInt16(this.bufferSlot);
        this.bufferSlot += 2;
        return String.fromCharCode(result);
    }

    readBoolean(): boolean {
        const result = this.view.getInt8(this.bufferSlot);
        this.bufferSlot += 1;
        return !!result;
    }

    readShort(): number {
        const result = this.view.getInt16(this.bufferSlot);
        this.bufferSlot += 2;
        return result;
    }

    readByte(): number {
        const result = this.view.getInt8(this.bufferSlot);
        this.bufferSlot += 1;
        return result;
    }

    readFloat(): number {
        const result = this.view.getFloat32(this.bufferSlot);
        this.bufferSlot += 4;
        return result;
    }

    // readLong(): number {
    //     let result = this.view.getBigInt64(this.bufferSlot);
    //     this.bufferSlot = this.bufferSlot + 8;
    //     return BigInt(result);
    // }

    readDouble(): number {
        const result = this.view.getFloat64(this.bufferSlot);
        this.bufferSlot += 8;
        return result;
    }

    readString(): string {
        const size = (this.view.getInt16(this.bufferSlot));
        this.bufferSlot += 2;
        const arrayString = [];
        for (let i = 0; i < size; i++) {
            arrayString.push(this.view.getUint8(this.bufferSlot));
            this.bufferSlot++;
        }
        let str = '';
        for (let i = 0; i < arrayString.length; i++) {
            const value = arrayString[i];

            if (value < 0x80) {
                str += String.fromCharCode(value);
            } else if (value > 0xBF && value < 0xE0) {
                str += String.fromCharCode((value & 0x1F) << 6 | arrayString[i + 1] & 0x3F);
                i += 1;
            } else if (value > 0xDF && value < 0xF0) {
                str += String.fromCharCode((value & 0x0F) << 12 | (arrayString[i + 1] & 0x3F) << 6 | arrayString[i + 2] & 0x3F);
                i += 2;
            } else {
                const charCode = ((value & 0x07) << 18 | (arrayString[i + 1] & 0x3F) << 12 | (arrayString[i + 2] & 0x3F) << 6 | arrayString[i + 3] & 0x3F) - 0x010000;
                str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
                i += 3;
            }
        }

        return str;
    }
}

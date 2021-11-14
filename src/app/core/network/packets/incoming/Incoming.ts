import { IncomingPacket } from './IncomingPacket';
import { Core } from '../../../Core';

export abstract class Incoming {
    public core: Core;
    private _packet: IncomingPacket;

    constructor(core: Core) {
        this.core = core;
    }

    public setPacket(packet: IncomingPacket): void {
        this._packet = packet;
    }

    public abstract process(): void;

    public get packet(): IncomingPacket {
        return this._packet;
    }
}

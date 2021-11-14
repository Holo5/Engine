import { Incoming } from '../Incoming';

export class RoomPropertyMessageEvent extends Incoming {
    public process() {
        const key = this.packet.readString();
        const value = this.packet.readString();

        // Pas besoin d'utiliser une quelconque "timeline" pour changer des frames sur habbo
    }
}

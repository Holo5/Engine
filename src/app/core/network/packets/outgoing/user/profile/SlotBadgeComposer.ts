import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';
import { Badge } from '../../../../../logic/badge/Badge';

export class SlotBadgeComposer extends Outgoing {
    private badges: Badge[];

    constructor(badges: Badge[]) {
        super(OutgoingHeader.SET_ACTIVATED_BADGES_MESSAGE);

        this.badges = badges;
    }

    public compose(): OutgoingPacket {
        for (let i = 0; i < 5; i++) {
            const j = i + 1;

            if (this.badges[i]) {
                this.packet.writeInt(j);
                this.packet.writeString(this.badges[i].name);
            } else {
                this.packet.writeInt(j);
                this.packet.writeString('');
            }
        }

        return this.packet.prepare();
    }
}

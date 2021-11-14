import { PlayerData } from '../../../../logic/client/PlayerData';
import { Incoming } from '../Incoming';
import { UserNameConfirmationComposer } from '../../outgoing/user/UserNameConfirmationComposer';
import { UserInfoComposer } from '../../outgoing/user/UserInfoComposer';

export class UserInfoEvent extends Incoming {
    public process(): void {
        const userid = this.packet.readInt();
        const username = this.packet.readString();
        const figure = this.packet.readString();
        const gender = this.packet.readString();
        const motto = this.packet.readString();

        this.packet.readBoolean();
        this.packet.readInt();

        const dailyRespects = this.packet.readInt();
        const dailyPetsScratches = this.packet.readInt();

        const playerData = new PlayerData(
            userid,
            username,
            figure,
            gender,
            motto,
            dailyRespects,
            dailyPetsScratches,
        );

        this.core.network.socketClient.processOutgoing(new UserNameConfirmationComposer(username));
        this.core.player.setClientData(playerData);
    }
}

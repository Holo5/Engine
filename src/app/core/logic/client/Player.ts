import { Core } from '../../Core';
import { NavigatorSearchComposer } from '../../network/packets/outgoing/navigator/NavigatorSearchComposer';
import { RoomEnterComposer } from '../../network/packets/outgoing/room/access/RoomEnterComposer';
import { PlayerData } from './PlayerData';
import { CatalogIndexRequestComposer } from '../../network/packets/outgoing/catalog/CatalogIndexRequestComposer';
import { UserItemsComposer } from '../../network/packets/outgoing/user/UserItemsComposer';
import { PlayerState } from './PlayerState';
import { PlayerInventory } from './PlayerInventory';
import { ClientPongComposer } from '../../network/packets/outgoing/client/ClientPongComposer';
import { PlayerEvents } from './PlayerEvents';
import { PlayerInteraction } from './PlayerInteraction';
import { InitializeFriendListComposer } from '../../network/packets/outgoing/messenger/InitializeFriendListComposer';
import { PlayerBadges } from './PlayerBadges';
import { ClubStatusComposer } from '../../network/packets/outgoing/user/club/ClubStatusComposer';
import { ClubState } from './ClubState';
import { PlayerRank } from './PlayerRank';
import { PlayerCurrencies } from './PlayerCurrencies';
import { RoomDataRequestComposer } from '../../network/packets/outgoing/room/RoomDataRequestComposer';

export class Player {
    public playerData: PlayerData;
    public playerState: PlayerState;
    public playerInventory: PlayerInventory;
    public playerEvents: PlayerEvents;
    public playerInteraction: PlayerInteraction;
    public playerBadges: PlayerBadges;
    public playerClubState: ClubState;
    public playerRank: PlayerRank;
    public playerCurrencies: PlayerCurrencies;

    constructor(public core: Core) {
        this.playerState = new PlayerState();
        this.playerBadges = new PlayerBadges(core);
        this.playerInventory = new PlayerInventory(core);
        this.playerEvents = new PlayerEvents(core);
        this.playerInteraction = new PlayerInteraction(core);
        this.playerCurrencies = new PlayerCurrencies(core);
    }

    public async setClientData(value: PlayerData) {
        this.playerData = value;

        this.core.store.dispatch('news/loadNews', this.playerData.username);

        this.core.store.commit('loadingOverlay/setLoadingProgress', 'Loading friends...');
        await this.core.store.dispatch('console/getFriendsList');
        this.core.store.commit('loadingOverlay/setLoadingProgress', `Welcome, ${this.playerData.username}!`);
        this.core.store.commit('loadingOverlay/endingLoading');
        this.core.store.commit('clientData/setFigure', this.playerData.figure);
        this.core.store.commit('clientData/setUsername', this.playerData.username);
        this.core.store.commit('clientData/setUserId', this.playerData.id);

        // https://habbocity.me/room/1606704 CityWish
        // https://habbocity.me/room/2063687 HOLO5
        // https://habbocity.me/room/1820215 DraftCity
        // https://habbocity.me/room/2164900 Réception
        // https://habbocity.me/room/2063015 Ice Café
        // https://habbocity.me/room/1816838 Chez moi
        this.navigateToRoom(2164900);

        this.core.network.socketClient.processOutgoing(new NavigatorSearchComposer('official_view', ''));
        this.core.network.socketClient.processOutgoing(new CatalogIndexRequestComposer());
        this.core.network.socketClient.processOutgoing(new UserItemsComposer());
        this.core.network.socketClient.processOutgoing(new InitializeFriendListComposer());
        this.core.network.socketClient.processOutgoing(new ClubStatusComposer());

        this.playerEvents.registerRoomEvent();

        setInterval(() => {
            this.core.network.socketClient.processOutgoing(new ClientPongComposer());
        }, 20000);
    }

    navigateToRoom(roomId: number) {
        this.core.gameManager.navigatorManager.forwardRoom(roomId);
    }

    navigatorQuery(category: string, query: string) {
        this.core.network.socketClient.processOutgoing(new NavigatorSearchComposer(category, query));
    }

    setPlayerClubState(clubState: ClubState) {
        this.playerClubState = clubState;

        this.core.store.commit('clientData/setClubState', clubState);
    }

    setPlayerRank(playerRank: PlayerRank) {
        this.playerRank = playerRank;

        this.core.store.commit('clientData/setRank', playerRank);
    }
}

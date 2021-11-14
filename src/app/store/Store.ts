import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { BetaModule } from './modules/beta/BetaStore';
import { NetworkModule } from './modules/client/network/NetworkStore';
import { BridgeStore } from './modules/client/bridge/BridgeStore';
import { LoadingModule } from './modules/overlay/LoadingStore';
import { AlertModule } from './modules/alert/AlertStore';
import { PopupAlertModule } from './modules/alert/PopupAlertStore';
import { NotificationModule } from './modules/game/Notification/NotificationStore';
import { BottomBarModule } from './modules/game/BottomBar/BottomBarStore';
import { ClientDataModule } from './modules/game/Client/ClientDataStore';
import { ProductInteractionModule } from './modules/game/ProductInteraction/ProductInteractionStore';
import { ChatPanelModule } from './modules/game/Chat/ChatPanelStore';
import { ChatBarModule } from './modules/game/Chat/ChatBarStore';
import { ChatHistoryModule } from './modules/game/Chat/ChatHistoryStore';
import { NavigationModule } from './modules/game/Navigator/NavigatorStore';
import { ConsoleModule } from './modules/game/Console/ConsoleStore';
import { MessengerModule } from './modules/game/Messenger/MessengerStore';
import { InventoryModule } from './modules/game/Inventory/InventoryStore';
import { TradeModule } from './modules/game/Inventory/TradeStore';
import { RoomModule } from './modules/game/Room/RoomStore';
import { RoomCreationModule } from './modules/game/RoomCreation/RoomCreationStore';
import { DoorbellModule } from './modules/game/Doorbell/DoorbellStore';
import { RoomSettingsModule } from './modules/game/Room/RoomSettingsStore';
import { CatalogModule } from './modules/game/Catalog/CatalogStore';
import { ProfileModule } from './modules/game/Profile/ProfileStore';
import { NewsModule } from './modules/game/News/NewsModule';

Vue.use(Vuex);

export const HStore = new Vuex.Store({
    modules: {
        // Beta
        beta: BetaModule,
        // Network
        network: NetworkModule,
        // Bridge
        bridge: BridgeStore,
        // Overlay
        loadingOverlay: LoadingModule,
        // Alert
        alertZone: AlertModule,
        popupAlert: PopupAlertModule,
        // Game
        notification: NotificationModule,
        bottomBar: BottomBarModule,
        clientData: ClientDataModule,
        previewInteraction: ProductInteractionModule,
        // Chat
        chatPanel: ChatPanelModule,
        chatBar: ChatBarModule,
        chatHistory: ChatHistoryModule,
        // Navigator
        navigator: NavigationModule,
        // Catalog
        catalog: CatalogModule,
        // Friends
        console: ConsoleModule,
        messenger: MessengerModule,
        // Inventory
        inventory: InventoryModule,
        trade: TradeModule,
        // Room
        room: RoomModule,
        roomCreation: RoomCreationModule,
        doorbell: DoorbellModule,
        roomSettings: RoomSettingsModule,
        // Profile
        profile: ProfileModule,
        // News
        news: NewsModule,
    },
    strict: false,
});

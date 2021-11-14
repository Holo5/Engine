import { RoomManager } from './room/RoomManager';
import { Core } from '../Core';
import { NavigatorManager } from './navigator/NavigatorManager';
import { NotificationManager } from './notification/NotificationManager';
import { ConsoleManager } from './console/ConsoleManager';
import { PopupManager } from './notification/PopupManager';
import { HistoryManager } from './history/HistoryManager';
import { UnitManager } from './unit/UnitManager';
import { ItemManager } from './item/ItemManager';
import { ChatManager } from './chat/ChatManager';
import { SettingsManager } from './settings/SettingsManager';
import { ModerationManager } from './moderation/ModerationManager';
import { PermissionsManager } from './permissions/PermissionsManager';
import { Manager } from './Manager';
import { DoorbellManager } from './access/DoorbellManager';
import { TradeManager } from './trade/TradeManager';
import { CatalogManager } from './catalog/CatalogManager';
import { ProfileManager } from './profile/ProfileManager';

export class GameManager extends Manager {
    public unitManager: UnitManager;
    public itemManager: ItemManager;
    public chatManager: ChatManager;
    public settingsManager: SettingsManager;
    public moderationManager: ModerationManager;
    public permissionsManager: PermissionsManager;
    public roomManager: RoomManager;
    public navigatorManager: NavigatorManager;
    public notificationManager: NotificationManager;
    public consoleManager: ConsoleManager;
    public popupManager: PopupManager;
    public historyManager: HistoryManager;
    public catalogManager: CatalogManager;
    public doorbellManager: DoorbellManager;
    public tradeManager: TradeManager;
    public profileManager: ProfileManager;

    constructor(public core: Core) {
        super(core);
    }

    init() {
        this.unitManager = new UnitManager(this.core);
        this.itemManager = new ItemManager(this.core);
        this.chatManager = new ChatManager(this.core);
        this.settingsManager = new SettingsManager(this.core);
        this.moderationManager = new ModerationManager(this.core);
        this.permissionsManager = new PermissionsManager(this.core);
        this.roomManager = new RoomManager(this.core);
        this.navigatorManager = new NavigatorManager(this.core);
        this.notificationManager = new NotificationManager(this.core);
        this.consoleManager = new ConsoleManager(this.core);
        this.popupManager = new PopupManager(this.core);
        this.historyManager = new HistoryManager(this.core);
        this.catalogManager = new CatalogManager(this.core);
        this.doorbellManager = new DoorbellManager(this.core);
        this.tradeManager = new TradeManager(this.core);
        this.profileManager = new ProfileManager(this.core);
    }

    public clear(): void {
        this.unitManager.clear();
        this.itemManager.clear();
        this.chatManager.clear();
        this.settingsManager.clear();
        this.moderationManager.clear();
        this.permissionsManager.clear();
        this.roomManager.clear();
        this.doorbellManager.clear();
        this.tradeManager.clear();
        this.popupManager.clear();
    }
}

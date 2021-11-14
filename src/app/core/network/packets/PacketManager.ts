import { ClientPingEvent } from './incoming/client/ClientPingEvent';
import { Incoming } from './incoming/Incoming';
import { NavigatorSearchEvent } from './incoming/navigator/NavigatorSearchEvent';
import { ItemFloorAddEvent } from './incoming/room/item/floor/ItemFloorAddEvent';
import { ItemFloorEvent } from './incoming/room/item/floor/ItemFloorEvent';
import { RoomEnterEvent } from './incoming/room/RoomEnterEvent';
import { RoomInfoEvent } from './incoming/room/RoomInfoEvent';
import { RoomModelEvent } from './incoming/room/RoomModelEvent';
import { RoomModelNameEvent } from './incoming/room/RoomModelNameEvent';
import { UnitEvent } from './incoming/room/unit/UnitEvent';
import { UnitStatusEvent } from './incoming/room/unit/UnitStatusEvent';
import { SecurityTicketEventOK } from './incoming/security/SecurityTicketEventOK';
import { UserInfoEvent } from './incoming/user/UserInfoEvent';
import { UserItemsEvent } from './incoming/user/UserItemsEvent';
import { UserItemsRefreshEvent } from './incoming/user/UserItemsRefreshEvent';
import { IncomingHeader } from './incoming/IncomingHeader';
import { CatalogIndexEvent } from './incoming/catalog/CatalogIndexEvent';
import { CatalogPageEvent } from './incoming/catalog/CatalogPageEvent';
import { ItemStateEvent } from './incoming/room/item/floor/ItemStateEvent';
import { UnitMessageEvent } from './incoming/room/unit/UnitMessageEvent';
import { UnitRemoveEvent } from './incoming/room/unit/UnitRemoveEvent';
import { RoomPropertyMessageEvent } from './incoming/room/RoomPropertyMessageEvent';
import { RoomVisualizationSettingsMessageEvent } from './incoming/room/RoomVisualizationSettingsMessageEvent';
import { RoomHeightMapEvent } from './incoming/room/RoomHeightMapEvent';
import { RoomHeightTileEvent } from './incoming/room/RoomHeightTileEvent';
import { RemoveUserItemsEvent } from './incoming/user/RemoveUserItemsEvent';
import { ItemFloorRemoveEvent } from './incoming/room/item/floor/ItemFloorRemoveEvent';
import { RoomNotificationMessageEvent } from './incoming/room/RoomNotificationMessageEvent';
import { DoorbellEvent } from './incoming/room/access/DoorbellEvent';
import { AccessDeniedEvent } from './incoming/room/access/AccesDeniedEvent';
import { AccessAllowedEvent } from './incoming/room/access/AccesAllowedEvent';
import { RoomErrorMessageEvent } from './incoming/room/alerts/RoomErrorMessageEvent';
import { UnitCarryItemEvent } from './incoming/room/unit/UnitCarryItemEvent';
import { SettingsDataEvent } from './incoming/room/settings/SettingsDataEvent';
import { RoomCategoriesEvent } from './incoming/navigator/RoomCategoriesEvent';
import { QuitRoomEvent } from './incoming/room/QuitRoomEvent';
import { YouAreOwnerEvent } from './incoming/room/permissions/YouAreOwnerEvent';
import { YouAreControllerEvent } from './incoming/room/permissions/YouAreControllerEvent';
import { RoomRatingEvent } from './incoming/room/settings/RoomRatingEvent';
import { RoomInfoUpdatedEvent } from './incoming/room/RoomInfoUpdatedEvent';
import { GetUsersBannedEvent } from './incoming/room/moderation/GetUsersBannedEvent';
import { RoomUserUnbanedEvent } from './incoming/room/moderation/RoomUserUnbanedEvent';
import { RightsListEvent } from './incoming/room/settings/RightsListEvent';
import { RemoveRightsEvent } from './incoming/room/permissions/RemoveRightsEvent';
import { FriendsListEvent } from './incoming/messenger/FriendsListEvent';
import { FlatControllerAddedEvent } from './incoming/room/permissions/FlatControllerAddedEvent';
import { MessageReceivedEvent } from './incoming/messenger/MessageReceivedEvent';
import { InstantMessageErrorEvent } from './incoming/messenger/InstantMessageErrorEvent';
import { FriendListUpdateEvent } from './incoming/messenger/FriendListUpdateEvent';
import { FriendRequestsEvent } from './incoming/messenger/FriendRequestsEvent';
import { NewFriendRequestEvent } from './incoming/messenger/NewFriendRequestEvent';
import { UserSearchResultEvent } from './incoming/messenger/UserSearchResultEvent';
import { InviteFriendEvent } from './incoming/messenger/InviteFriendEvent';
import { RoomForwardEvent } from './incoming/room/RoomForwardEvent';
import { InventoryBadgesEvent } from './incoming/user/inventory/InventoryBadgesEvent';
import { UserBadgesEvent } from './incoming/user/profile/UserBadgesEvent';
import { TradeStartEvent } from './incoming/room/trading/TradeStartEvent';
import { TradeCloseEvent } from './incoming/room/trading/TradeCloseEvent';
import { TradingErrorEvent } from './incoming/room/trading/TradingErrorEvent';
import { TradeAcceptUpdateEvent } from './incoming/room/trading/TradeAcceptUpdateEvent';
import { TradingUpdateEvent } from './incoming/room/trading/TradingUpdateEvent';
import { TradingFinishedEvent } from './incoming/room/trading/TradingFinishedEvent';
import { TradingCompleteEvent } from './incoming/room/trading/TradingCompleteEvent';
import { FloodFilterEvent } from './incoming/room/permissions/FloodFilterEvent';
import { UnitWhisperMessageEvent } from './incoming/room/unit/UnitWhisperMessageEvent';
import { ClubStatusEvent } from './incoming/user/club/ClubStatusEvent';
import { FuseRightsEvent } from './incoming/user/FuseRightsEvent';
import { RespectNotificationEvent } from './incoming/room/avatar/RespectNotificationEvent';
import { CanCreateRoomEvent } from './incoming/navigator/CanCreateRoomEvent';
import { RoomCreatedEvent } from './incoming/navigator/RoomCreatedEvent';
import { UnseenItemEvent } from './incoming/user/inventory/UnseenItemEvent';
import { ReceivedCreditsEvent } from './incoming/user/purse/ReceivedCreditsEvent';
import { BoughtItemEvent } from './incoming/catalog/BoughtItemEvent';
import { GiftWrappingConfigurationEvent } from './incoming/catalog/data/GiftWrappingConfigurationEvent';
import { OpenGiftEvent } from './incoming/room/gift/OpenGiftEvent';
import { ReceivedActivityPointsEvent } from './incoming/user/purse/ReceivedActivityPointsEvent';
import { CurrenciesEvent } from './incoming/user/purse/CurrenciesEvent';
import { SlideObjectBundleEvent } from './incoming/room/object/SlideObjectBundleEvent';
import { CantConnectEvent } from './incoming/room/alerts/CantConnectEvent';
import { LoadProfileEvent } from './incoming/user/profile/LoadProfileEvent';
import { LoadRelationshipsEvent } from './incoming/user/profile/LoadRelationshipsEvent';
import { GroupInformationEvent } from './incoming/group/GroupInformationEvent';

export class PacketManager {
    private _handlers: { header: number | string, handler: typeof Incoming }[];

    constructor() {
        this._handlers = [];
    }

    private registerClient(): void {
        this.addHandler(IncomingHeader.LATENCY_RESPONSE_MESSAGE, ClientPingEvent);
        this.addHandler(IncomingHeader.USER_OBJECT_MESSAGE, UserInfoEvent);
        this.addHandler(IncomingHeader.FURNI_LIST_UPDATE_MESSAGE, UserItemsRefreshEvent);
        this.addHandler(IncomingHeader.FURNI_LIST_MESSAGE, UserItemsEvent);
        this.addHandler(IncomingHeader.FURNI_LIST_REMOVE_MESSAGE, RemoveUserItemsEvent);
        this.addHandler(IncomingHeader.SCR_SEND_USER_INFO_MESSAGE, ClubStatusEvent);
        //
        // Profile
        this.addHandler(IncomingHeader.HABBO_USER_BADGES_MESSAGE, UserBadgesEvent);
        //
        // Rights
        this.addHandler(IncomingHeader.USER_RIGHTS_MESSAGE, FuseRightsEvent);
        //
        // Currencies
        this.addHandler(IncomingHeader.CREDIT_BALANCE_MESSAGE, ReceivedCreditsEvent);
        this.addHandler(IncomingHeader.HABBO_ACTIVITY_POINT_NOTIFICATION_MESSAGE, ReceivedActivityPointsEvent);
        this.addHandler(IncomingHeader.ACTIVITY_POINTS_MESSAGE, CurrenciesEvent);
    }

    private registerInventory(): void {
        this.addHandler(IncomingHeader.BADGES_MESSAGE, InventoryBadgesEvent);
        this.addHandler(IncomingHeader.FURNI_LIST_NOTIFICATION_MESSAGE, UnseenItemEvent);
    }

    private registerSecurity(): void {
        this.addHandler(IncomingHeader.AUTHENTICATION_OKMESSAGE, SecurityTicketEventOK);
        // this.addHandler(IncomingHeader.SECURITY_UNKNOWN2, SecurityUnknown2Event); --> UNIQUE_MACHINE_IDMESSAGE
    }

    private registerGroups(): void {
        this.addHandler(IncomingHeader.GROUP_INFO_MESSAGE, GroupInformationEvent);
    }

    private registerProfile(): void {
        this.addHandler(IncomingHeader.PROFILE_INFORMATION_MESSAGE, LoadProfileEvent);
        this.addHandler(IncomingHeader.GET_RELATIONSHIPS_MESSAGE, LoadRelationshipsEvent);
    }

    private registerRoom(): void {
        // Room
        this.addHandler(IncomingHeader.OPEN_CONNECTION_MESSAGE, RoomEnterEvent);
        this.addHandler(IncomingHeader.CLOSE_CONNECTION_MESSAGE, QuitRoomEvent);
        this.addHandler(IncomingHeader.ROOM_READY_MESSAGE, RoomModelNameEvent);
        this.addHandler(IncomingHeader.FLOOR_HEIGHT_MAP_MESSAGE, RoomModelEvent);
        this.addHandler(IncomingHeader.ROOM_PROPERTY_MESSAGE, RoomPropertyMessageEvent);
        this.addHandler(IncomingHeader.ROOM_VISUALIZATION_SETTINGS_MESSAGE, RoomVisualizationSettingsMessageEvent);
        this.addHandler(IncomingHeader.ROOM_INFO_UPDATED_MESSAGE, RoomInfoUpdatedEvent);
        this.addHandler(IncomingHeader.HEIGHT_MAP_MESSAGE, RoomHeightMapEvent);
        this.addHandler(IncomingHeader.UPDATE_STACK_MAP_MESSAGE, RoomHeightTileEvent);
        this.addHandler(IncomingHeader.GET_GUEST_ROOM_RESULT_MESSAGE, RoomInfoEvent);
        this.addHandler(IncomingHeader.ROOM_NOTIFICATION_MESSAGE, RoomNotificationMessageEvent);
        this.addHandler(IncomingHeader.ROOM_FORWARD_MESSAGE, RoomForwardEvent);

        //
        //  // Objects
        this.addHandler(IncomingHeader.SLIDE_OBJECT_BUNDLE_MESSAGE, SlideObjectBundleEvent);

        //
        // // Settings
        this.addHandler(IncomingHeader.ROOM_SETTINGS_DATA_MESSAGE, SettingsDataEvent);
        this.addHandler(IncomingHeader.USER_FLAT_CATS_MESSAGE, RoomCategoriesEvent);
        this.addHandler(IncomingHeader.ROOM_RATING_MESSAGE, RoomRatingEvent);
        this.addHandler(IncomingHeader.ROOM_RIGHTS_LIST_MESSAGE, RightsListEvent);
        //
        // // Unit
        this.addHandler(IncomingHeader.USERS_MESSAGE, UnitEvent);
        this.addHandler(IncomingHeader.USER_UPDATE_MESSAGE, UnitStatusEvent);
        this.addHandler(IncomingHeader.CHAT_MESSAGE, UnitMessageEvent);
        this.addHandler(IncomingHeader.SHOUT_MESSAGE, UnitMessageEvent);
        this.addHandler(IncomingHeader.WHISPER_MESSAGE, UnitWhisperMessageEvent);
        this.addHandler(IncomingHeader.RESPECT_NOTIFICATION_MESSAGE, RespectNotificationEvent);
        this.addHandler(IncomingHeader.USER_REMOVE_MESSAGE, UnitRemoveEvent);
        this.addHandler(IncomingHeader.CARRY_OBJECT_MESSAGE, UnitCarryItemEvent);
        //
        // // Item
        this.addHandler(IncomingHeader.OBJECTS_MESSAGE, ItemFloorEvent);
        this.addHandler(IncomingHeader.OBJECT_UPDATE_MESSAGE, ItemStateEvent);
        this.addHandler(IncomingHeader.OBJECT_ADD_MESSAGE, ItemFloorAddEvent);
        this.addHandler(IncomingHeader.OBJECT_REMOVE_MESSAGE, ItemFloorRemoveEvent);
        //
        // // Access
        this.addHandler(IncomingHeader.DOORBELL_MESSAGE, DoorbellEvent);
        this.addHandler(IncomingHeader.FLAT_ACCESS_DENIED_MESSAGE, AccessDeniedEvent);
        this.addHandler(IncomingHeader.FLAT_ACCESSIBLE_MESSAGE, AccessAllowedEvent);
        this.addHandler(IncomingHeader.GENERIC_ERROR_MESSAGE, RoomErrorMessageEvent);
        this.addHandler(IncomingHeader.CANT_CONNECT_MESSAGE, CantConnectEvent);
        //
        // // Permissions
        this.addHandler(IncomingHeader.YOU_ARE_OWNER_MESSAGE, YouAreOwnerEvent);
        this.addHandler(IncomingHeader.YOU_ARE_CONTROLLER_MESSAGE, YouAreControllerEvent);
        this.addHandler(IncomingHeader.FLAT_CONTROLLER_REMOVED_MESSAGE, RemoveRightsEvent);
        this.addHandler(IncomingHeader.FLAT_CONTROLLER_ADDED_MESSAGE, FlatControllerAddedEvent);
        this.addHandler(IncomingHeader.FLOOD_CONTROL_MESSAGE, FloodFilterEvent);
        //
        // // Moderation
        this.addHandler(IncomingHeader.GET_ROOM_BANNED_USERS_MESSAGE, GetUsersBannedEvent);
        this.addHandler(IncomingHeader.UNBAN_USER_FROM_ROOM_MESSAGE, RoomUserUnbanedEvent);
        //
        // // Trading
        this.addHandler(IncomingHeader.TRADING_START_MESSAGE, TradeStartEvent);
        this.addHandler(IncomingHeader.TRADING_CLOSED_MESSAGE, TradeCloseEvent);
        this.addHandler(IncomingHeader.TRADING_ERROR_MESSAGE, TradingErrorEvent);
        this.addHandler(IncomingHeader.TRADING_ACCEPT_MESSAGE, TradeAcceptUpdateEvent);
        this.addHandler(IncomingHeader.TRADING_UPDATE_MESSAGE, TradingUpdateEvent);
        this.addHandler(IncomingHeader.TRADING_COMPLETE_MESSAGE, TradingCompleteEvent);
        this.addHandler(IncomingHeader.TRADING_FINISH_MESSAGE, TradingFinishedEvent);
        //
        // // Gift
        this.addHandler(IncomingHeader.OPEN_GIFT_MESSAGE, OpenGiftEvent);
    }

    private registerCatalog(): void {
        this.addHandler(IncomingHeader.CATALOG_INDEX_MESSAGE, CatalogIndexEvent);
        this.addHandler(IncomingHeader.CATALOG_PAGE_MESSAGE, CatalogPageEvent);
        this.addHandler(IncomingHeader.PURCHASE_OKMESSAGE, BoughtItemEvent);
        //
        // Data
        this.addHandler(IncomingHeader.GIFT_WRAPPING_CONFIGURATION_MESSAGE, GiftWrappingConfigurationEvent);
    }

    private registerNavigator(): void {
        this.addHandler(IncomingHeader.NAVIGATOR_SEARCH_RESULT_SET_MESSAGE, NavigatorSearchEvent);
        this.addHandler(IncomingHeader.CAN_CREATE_ROOM_MESSAGE, CanCreateRoomEvent);
        this.addHandler(IncomingHeader.FLAT_CREATED_MESSAGE, RoomCreatedEvent);
    }

    private registerMessenger(): void {
        this.addHandler(IncomingHeader.BUDDY_LIST_MESSAGE, FriendsListEvent);
        this.addHandler(IncomingHeader.NEW_CONSOLE_MESSAGE_MESSAGE, MessageReceivedEvent);
        this.addHandler(IncomingHeader.INSTANT_MESSAGE_ERROR_MESSAGE, InstantMessageErrorEvent);
        this.addHandler(IncomingHeader.FRIEND_LIST_UPDATE_MESSAGE, FriendListUpdateEvent);
        this.addHandler(IncomingHeader.BUDDY_REQUESTS_MESSAGE, FriendRequestsEvent);
        this.addHandler(IncomingHeader.NEW_BUDDY_REQUEST_MESSAGE, NewFriendRequestEvent);
        this.addHandler(IncomingHeader.HABBO_SEARCH_RESULT_MESSAGE, UserSearchResultEvent);
        this.addHandler(IncomingHeader.ROOM_INVITE_MESSAGE, InviteFriendEvent);
    }

    public init() {
        this.registerClient();
        this.registerInventory();
        this.registerSecurity();
        this.registerGroups();
        this.registerProfile();
        this.registerRoom();
        this.registerNavigator();
        this.registerCatalog();
        this.registerMessenger();
    }

    public addHandler(header: number, handler: typeof Incoming) {
        const totalHandlers = this._handlers.length;

        const newHeader = header.toString() as any;

        for (let i = 0; i < totalHandlers; i++) {
            const existing = this._handlers[i];

            if (existing.header === newHeader) {
                this._handlers.splice(i, 1);

                break;
            }
        }

        this._handlers.push({ header: newHeader, handler });
    }

    public getHandler(header: number): typeof Incoming {
        let handler: typeof Incoming = null;

        const totalHandlers = this._handlers.length;

        for (let i = 0; i < totalHandlers; i++) {
            const existing = this._handlers[i];

            if (existing.header === header.toString()) {
                handler = existing.handler;

                break;
            }
        }

        return handler;
    }
}

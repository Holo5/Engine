import { Core } from '../../Core';
import { TileClickedEvent } from '../../event/TileEvents';
import { UnitWalkComposer } from '../../network/packets/outgoing/room/unit/UnitWalkComposer';
import { FurnitureClickedEvent } from '../../event/FurnitureEvents';

enum EItemEvent {
    NOTHING,
    MOVE,
    ROTATE,
    PICKUP,
}

export class PlayerEvents {
    private itemEvent: EItemEvent;

    constructor(public core: Core) {
        this.itemEvent = EItemEvent.NOTHING;
    }

    private registerKeyEvents(): void {
        document.addEventListener('keypress', (event: KeyboardEvent) => {
            if (event.key === 'Control') {
                this.itemEvent = EItemEvent.PICKUP;
            } else if (event.key === 'Shift') {
                this.itemEvent = EItemEvent.ROTATE;
            } else if (event.key === 'Alt') {
                this.itemEvent = EItemEvent.MOVE;
            } else {
                this.itemEvent = EItemEvent.NOTHING;
            }
        });

        document.addEventListener('keyup', (event: KeyboardEvent) => {
            this.itemEvent = EItemEvent.NOTHING;
        });
    }

    registerRoomEvent() {
        this.registerKeyEvents();

        this.core.engine.graphicEventBus.subscribe(TileClickedEvent, (e) => {
            this.core.network.socketClient.processOutgoing(new UnitWalkComposer(e.payload.mapPosition.x, e.payload.mapPosition.y));
        });

        this.core.engine.graphicEventBus.subscribe(FurnitureClickedEvent, (e) => {
            this.core.player.playerInteraction.selectFurnitureItem(e.payload.furnitureItem);

            if (this.itemEvent === EItemEvent.PICKUP) {
                this.core.player.playerInteraction.pickUp();
            } else if (this.itemEvent === EItemEvent.MOVE) {
                this.core.player.playerInteraction.move();
            } else if (this.itemEvent === EItemEvent.ROTATE) {
                this.core.player.playerInteraction.rotate();
            }
        });
    }
}

import { DisplayObject, InteractionEvent, Point, Container, Sprite, Graphics } from 'pixi.js';
import { Configuration } from '../../../../../conf';
import { Engine } from '../../engine/Engine';
import { OutsideStageClickedEvent } from '../../../event/StageEvent';

export class EventManager {
    public engine: Engine;

    private _dragging: boolean;
    private _lastHover: number;
    private _lastHoverableFloorObject: DisplayObject;

    constructor(engine: Engine) {
        this.engine = engine;
        this._dragging = false;
        this._lastHover = performance.now();
    }

    init() {
        this.engine.app.stage.interactive = true;
        // @ts-ignore
        this.engine.app.stage.on('pointerdown', (e: InteractionEvent) => this.onDragStart(e));
        // @ts-ignore
        this.engine.app.stage.on('pointerup', this.onDragEnd.bind(this));
        // @ts-ignore
        this.engine.app.stage.on('pointerupoutside', this.onDragEnd.bind(this));
        // @ts-ignore
        this.engine.app.stage.on('pointermove', this.onDragMove.bind(this));
    }

    enableEvents() {
        this.engine.app.stage.interactive = true;
    }

    disableEvents() {
        this.engine.app.stage.interactive = false;
    }

    onDragStart(e: InteractionEvent) {
        this.click(this.toLocalPosition(e.data.getLocalPosition(this.engine.app.stage)));
        this._dragging = true;
    }

    onDragEnd() {
        this._dragging = false;
    }

    onDragMove(e: InteractionEvent) {
        if (this._dragging) {
            // @ts-ignore
            this.engine.sortableContainer.x += e.data.originalEvent.movementX;
            // @ts-ignore
            this.engine.sortableContainer.y += e.data.originalEvent.movementY;
        } else {
            // @ts-ignore
            this.hover(this.toLocalPosition(e.data.getLocalPosition(this.engine.app.stage)));
        }
    }

    private findChild(point: Point, container: Container): DisplayObject {
        const obj = Object.values(this.engine.sortableContainer.floorCategory).find((zob) => (zob.graphic as Sprite).containsPoint(point));

        if (obj !== undefined) return obj.graphic;

        return undefined;

        return container.children.find((child: Sprite) => child.containsPoint(point));
    }

    private findFloor(point: Point, container: Container): DisplayObject {
        const floor = Object.values(this.engine.sortableContainer.floorCategory).find((zob) => (zob.graphic as Sprite).containsPoint(point));
        if (floor !== undefined) return floor.graphic;

        return undefined;
    }

    private findFurni(point: Point, container: Container): DisplayObject {
        const furni = Object.values(this.engine.sortableContainer.furniCategory).find((zob) => (zob.graphic as Sprite).containsPoint(point));
        if (furni !== undefined) return furni.graphic;

        return undefined;
    }

    private checkInBounds(point: Point): boolean {
        return this.engine.sortableContainer.getBounds().contains(point.x, point.y);
    }

    click(point: Point) {
        if (this.checkInBounds(point)) {
            const localPoint = new Point(point.x - this.engine.sortableContainer.x, point.y - this.engine.sortableContainer.y);
            this.trigEvent(this.findFloor(localPoint, this.engine.sortableContainer), 'click');
            this.trigEvent(this.findFurni(localPoint, this.engine.sortableContainer), 'click');
        } else {
            this.engine.graphicEventBus.publish(OutsideStageClickedEvent({}));
        }
    }

    hover(point: Point) {
        if (performance.now() - this._lastHover > Configuration.canvas.minHoverableFloorDebounce) {
            if (this.checkInBounds(point)) {
                const localPoint = new Point(point.x - this.engine.sortableContainer.x, point.y - this.engine.sortableContainer.y);

                const object = this.findFloor(localPoint, this.engine.sortableContainer);
                if (this._lastHoverableFloorObject !== undefined && this._lastHoverableFloorObject !== object) {
                    this.trigEvent(this._lastHoverableFloorObject, 'mouseout');
                }

                if (this._lastHoverableFloorObject !== object) {
                    this.trigEvent(object, 'mouseover');
                    this._lastHoverableFloorObject = object;
                }
            }
            this._lastHover = performance.now();
        }
    }

    trigEvent(object: DisplayObject, eventType: string) {
        if (object !== undefined) {
            // @ts-ignore
            object.emit(eventType);
        }
    }

    private toLocalPosition(point: Point) {
        return new Point(point.x * window.devicePixelRatio, point.y * window.devicePixelRatio);
    }
}

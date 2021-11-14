import { Point } from 'pixi.js';

export class EventManager {
    public cursor: Point;
    public clicking: boolean;
    public doubleClicking: boolean;
    public dragging: boolean;

    constructor() {
        this.cursor = new Point(0, 0);
        this.clicking = false;
        this.doubleClicking = false;
        this.dragging = false;

        this.registerEvents();
    }

    public registerEvents() {
        document.body.onpointermove = (event: MouseEvent) => {
            this.cursor = new Point(event.clientX, event.clientY);
            this.dragging = this.clicking;
        };

        document.body.onpointerdown = () => {
            this.clicking = true;
        };

        document.body.onpointerup = () => {
            this.clicking = false;
        };
    }
}

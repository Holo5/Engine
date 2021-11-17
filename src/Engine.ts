import { AssetsManager } from './assets/AssetsManager';
import { AvatarModule } from './objects/avatars/AvatarModule';
import { DoubleTicker } from './ticker/DoubleTicker';
import { ItemModule } from './objects/items/ItemModule';
import { MapModule } from './objects/map/MapModule';
import { Matrix, Rectangle, Renderer, SCALE_MODES, settings } from 'pixi.js';
import { Stage } from './geometry/Stage';

export class Engine {
    public static TOP_ISO_MATRIX = new Matrix(1, 0.5, -1, 0.5);
    public static LEFT_ISO_MATRIX = new Matrix(1, 0.5, 0, 1);
    public static RIGHT_ISO_MATRIX = new Matrix(1, -0.5, 0, 1);
    public static AVATAR_BOUNDS = new Rectangle(-38, -140, 140, 160);

    public renderer: Renderer;
    public assetsManager: AssetsManager;
    public stage: Stage;
    public ticker: DoubleTicker;

    public itemModule: ItemModule;
    public mapModule: MapModule;
    public avatarModule: AvatarModule;

    constructor(
        private canvasContainer: HTMLElement = document.body,
        private width: number = 1000,
        private height: number = 1000,
        private autoResize: boolean = true,
        private backgroundAlpha: number = 0,
        private maxAnimationRate: number = 8,
        private maxDisplayRate: number = 24,
    ) {
        settings.RESOLUTION = window.devicePixelRatio;
        settings.SCALE_MODE = SCALE_MODES.NEAREST;

        this.renderer = new Renderer({
            width: this.width,
            height: this.height,
            backgroundAlpha: this.backgroundAlpha,
        });
        this.canvasContainer.innerHTML = '';
        this.canvasContainer.append(this.renderer.view);

        this.stage = new Stage(this);
        this.ticker = new DoubleTicker(8, 140);
        this.ticker.attachCallbacks(() => this.stage.animationTick(), () => this.stage.displayTick());

        this.assetsManager = new AssetsManager();
        this.itemModule = new ItemModule(this);
        this.mapModule = new MapModule(this);
        this.avatarModule = new AvatarModule(this);
    }

    public async init() {
        await this.assetsManager.init();
        this.itemModule.init();
        this.mapModule.init();
        this.avatarModule.init();
    }
}

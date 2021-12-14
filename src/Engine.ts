import { AssetsManager } from './assets/AssetsManager';
import { AvatarModule } from './objects/avatars/AvatarModule';
import { DoubleTicker } from './ticker/DoubleTicker';
import { IEngineOption } from './interfaces/IEngineOption';
import { ItemModule } from './objects/items/ItemModule';
import { MapModule } from './objects/map/MapModule';
import { Matrix, Rectangle, Renderer, SCALE_MODES, settings } from 'pixi.js';
import { Stage } from './geometry/Stage';

export class Engine {
    public static TOP_ISO_MATRIX = new Matrix(1, 0.5, -1, 0.5);
    public static LEFT_ISO_MATRIX = new Matrix(1, 0.5, 0, 1);
    public static RIGHT_ISO_MATRIX = new Matrix(1, -0.5, 0, 1);
    public static AVATAR_BOUNDS = new Rectangle(-38, -140, 140, 160);

    public canvasContainer: HTMLElement;
    public renderer: Renderer;
    public assetsManager: AssetsManager;
    public stage: Stage;
    public ticker: DoubleTicker;

    public itemModule: ItemModule;
    public mapModule: MapModule;
    public avatarModule: AvatarModule;

    constructor(
        private options: IEngineOption,
    ) {
        settings.RESOLUTION = 1;
        settings.SCALE_MODE = SCALE_MODES.NEAREST;

        this.renderer = new Renderer({
            width: options.width,
            height: options.height,
            backgroundAlpha: options.backgroundAlpha,
        });
        this.canvasContainer = options.canvasContainer;
        this.canvasContainer.innerHTML = '';
        this.canvasContainer.append(this.renderer.view);

        // TODO remove ? Yes
        console.log(window.devicePixelRatio);

        this.stage = new Stage(this);
        this.ticker = new DoubleTicker(options.maxAnimationRate, options.maxDisplayRate);
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

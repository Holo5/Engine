import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { utils, Matrix, Rectangle, Application } from 'pixi.js';
import { HotelViewIntl } from '@holo5/hotelview-intl';
import { AvatarModule } from '../objects/room/avatars/avatar-module/AvatarModule';
import { ItemModule } from '../objects/room/items/item-module/ItemModule';
import { Configuration } from '../../../../conf';
import { GraphicTransformer } from './utils/GraphicTransformer';
import { Ticker } from './ticker/Ticker';
import { EventManager } from '../managers/events/EventManager';
import { GraphicEventBus } from '../../event/GraphicEventBus';
import { TileTextureManager } from '../managers/texture-manager/TileTextureManager';
import { TileFactory } from '../objects/tile/TileFactory';
import { WallFactory } from '../objects/wall/WallFactory';
import { SortableContainer } from './container/SortableContainer';
import { GraphicCacheManager } from '../objects/object/cache/GraphicCacheManager';

export class Engine {
    public static TOP_ISO_MATRIX = new Matrix(1, 0.5, -1, 0.5);
    public static LEFT_ISO_MATRIX = new Matrix(1, 0.5, 0, 1);
    public static RIGHT_ISO_MATRIX = new Matrix(1, -0.5, 0, 1);
    public static AVATAR_BOUNDS = new Rectangle(-38, -140, 140, 160);

    public sortableContainer: SortableContainer;
    public eventManager: EventManager;
    public graphicTransformer: GraphicTransformer;
    public graphicCacheManager: GraphicCacheManager;
    public animationTicker: Ticker;
    public graphicEventBus: GraphicEventBus;
    public tileTextureManager: TileTextureManager;

    public tileFactory: TileFactory;
    public wallFactory: WallFactory;

    public itemModule: ItemModule;
    public avatarModule: AvatarModule;

    public hotelView: HotelViewIntl;
    public stageContainerElement: HTMLElement;
    public app: Application;

    constructor() {
        this.sortableContainer = new SortableContainer(this);
        this.eventManager = new EventManager(this);

        this.animationTicker = new Ticker();
        this.graphicEventBus = new GraphicEventBus();

        this.tileTextureManager = new TileTextureManager();
        this.graphicTransformer = new GraphicTransformer();
        this.graphicCacheManager = new GraphicCacheManager(this.graphicTransformer);

        this.hotelView = new HotelViewIntl(`${Configuration.images.imageDomain}hotel_views/intl/`);
    }

    private static sayHello() {
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            const args = ['\n %c %c %c \u26A1 HOLO5 \u26A1  %c %c \u2916 https://holo5.co \u270A %c \n', 'background: #0c5a7f; padding:5px 0;', 'background: #0c5a7f; padding:5px 0;', 'color: white; background: #030307; padding:5px 0;', 'background-color: white; padding: 5px 0;', 'background: #0c5a7f; padding:5px 0; color: white;', 'background-color: white; padding: 5px 0px;'];
            console.log(...args);
        } else if (console) {
            console.log('HOLO5  - holo5.co');
        }
    }

    private static registerPlugins() {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);
    }

    private initPixi() {
        utils.clearTextureCache();
        this.app = new Application({
            backgroundColor: 0x000000,
            preserveDrawingBuffer: true,
            resizeTo: this.stageContainerElement,
        });

        this.app.ticker.maxFPS = Configuration.canvas.maxFrameRate;
        this.stageContainerElement.appendChild(this.app.view);

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    private resize() {
        this.app.stage.hitArea = new Rectangle(0, 0, this.stageContainerElement.clientWidth, this.stageContainerElement.clientHeight);
        this.hotelView.resize(this.stageContainerElement.clientWidth, this.stageContainerElement.clientHeight);
    }

    private initTickers() {
        this.animationTicker.start();

        this.animationTicker.add('gsap', () => {
            gsap.ticker.tick();
        });
    }

    private initFactories() {
        this.tileFactory = new TileFactory(this);
        this.wallFactory = new WallFactory(this);
    }

    private async initModules() {
        this.itemModule = new ItemModule(this);
        this.avatarModule = new AvatarModule(this);
        await this.itemModule.init();
        await this.avatarModule.init();
    }

    public async init() {
        Engine.sayHello();
        Engine.registerPlugins();

        this.stageContainerElement = document.getElementById(Configuration.canvas.stageContainer);

        await this.hotelView.init();

        this.initPixi();
        this.initTickers();

        this.app.stage.addChild(this.sortableContainer);
        this.eventManager.init();
        this.sortableContainer.clear(true);

        this.graphicTransformer.init(this.app.renderer);

        await this.tileTextureManager.init();
        await this.initFactories();
        await this.initModules();
    }
}

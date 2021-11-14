import { AbstractRenderer, Container, autoDetectRenderer, ParticleContainer, settings } from 'pixi.js';
import { GraphicObject } from './GraphicObject';
import { EventManager } from './EventManager';
import { CacheManager } from './CacheManager';
import { ResourceManager } from './ResourceManager';
import { IObject } from './interface/IObject';

export class Engine {
    public renderer: AbstractRenderer;
    public stage: Container;
    public eventManager: EventManager;
    public cacheManager: CacheManager;
    public resourceManager: ResourceManager;
    public graphicObjects: IObject[];
    public currentFrame: number;

    private maxAnimationRate: number;
    private lastAnimationTick: number;
    private minAnimationTick: number;

    private maxFPS: number;
    private lastTick: number;
    private minTick: number;

    constructor() {
        console.log({ width: document.body.clientWidth, height: document.body.clientHeight });

        this.renderer = autoDetectRenderer({ backgroundColor: 0x005500, width: document.body.clientWidth, height: document.body.clientHeight });
        this.stage = new Container();
        this.eventManager = new EventManager();
        this.cacheManager = new CacheManager(this.renderer);
        this.resourceManager = new ResourceManager();
        this.graphicObjects = [];
        this.currentFrame = 0;

        document.body.append(this.renderer.view);

        this.updateMaxAnimationRate(8);
        this.updateMaxFPS(24);

        this.renderObjects();
    }

    public updateMaxAnimationRate(maxAnimationRate: number) {
        this.maxAnimationRate = maxAnimationRate;
        this.lastAnimationTick = 0;
        this.minAnimationTick = 1000 / maxAnimationRate;
    }

    public updateMaxFPS(maxFPS: number) {
        this.maxFPS = maxFPS;
        this.lastTick = 0;
        this.minTick = 1000 / maxFPS;
    }

    public registerObject(object: IObject) {
        this.graphicObjects.push(object);
    }

    public unregisterObject(graphicObject: IObject) {
        const indexOf = this.graphicObjects.indexOf(graphicObject);
        if (indexOf !== -1) {
            this.graphicObjects.splice(indexOf, 1);
        }
    }

    private renderObjects() {
        if ((window.performance.now() - this.lastAnimationTick) >= this.minAnimationTick) {
            this.currentFrame++;
            this.lastAnimationTick = window.performance.now();

            for (let i = 0; i < this.graphicObjects.length; i++) {
                const graphicObject = this.graphicObjects[i];

                if (graphicObject.needUpdate()) {
                    graphicObject.update(this);
                }
            }
        }

        if ((window.performance.now() - this.lastTick) >= this.minTick) {
            this.renderer.render(this.stage);
            this.lastTick = window.performance.now();
        }

        requestAnimationFrame(this.renderObjects.bind(this));
    }
}

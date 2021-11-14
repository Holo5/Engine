import { ILoaderResource, Loader } from 'pixi.js';

export class ResourceManager {
    public loader: Loader;
    public loadingResources: string[];
    public resources: { [id: string]: ILoaderResource };

    public constructor() {
        this.loader = new Loader(undefined, 8);
        this.loader.onLoad.add(this.onLoad.bind(this));
        this.loadingResources = [];
        this.resources = {};
    }

    private onLoad(loader: Loader, resource: ILoaderResource) {
        if (resource.url.includes('png')) {
            this.resources[resource.name.split('_image')[0]] = resource;
        }
    }

    public has(id: string, url: string) {
        if (this.resources[id] !== undefined) {
            return true;
        }

        if (this.loadingResources.indexOf(id) === -1) {
            this.loader.add(id, url, { crossOrigin: true });
            this.loader.load();
            this.loadingResources.push(id);
        }

        return false;
    }

    public get(id: string) {
        return this.loader.resources[id];
    }
}

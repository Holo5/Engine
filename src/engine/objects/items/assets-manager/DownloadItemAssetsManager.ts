import { Configuration } from '../../../../../example/conf';
import { IBaseAssetsFiles, IItemAssetsManager } from './interfaces/IItemAssetsManager';
import { IFurniData } from '../interfaces/IFurniData';
import { ILoaderResource, Loader } from 'pixi.js';
import { Memento, Request } from 'mementojs';

export class DownloadItemAssetsManager extends Memento<ILoaderResource> implements IItemAssetsManager {
    private _loader: Loader;
    private _waitingAssets: Map<string, Request<ILoaderResource>>;

    constructor() {
        super({ maxSimultaneousRequest: 20 });

        this._loader = new Loader(Configuration.images.furnitureDomain, 10);
        this._waitingAssets = new Map<string, Request<ILoaderResource>>();
    }

    private loaded(loader: Loader, resource: ILoaderResource) {
        if (resource.name.includes('_image')) {
            const assetName = resource.name.substring(0, resource.name.indexOf('_image'));
            const request = this._waitingAssets.get(assetName);
            if (request !== undefined) {
                request.setData(this._loader.resources[assetName]);
                this._waitingAssets.delete(assetName);
            }
        }
    }

    private errored(error: any, loader: Loader, resource: ILoaderResource) {
        const assetName = resource.name.includes('_image') ? resource.name.substring(0, resource.name.indexOf('_image')) : resource.name;
        const request = this._waitingAssets.get(assetName);
        if (request !== undefined) {
            request.setError(`Furniture ${assetName} can't be loaded !`);
            this._waitingAssets.delete(assetName);
        }
    }

    public initBaseAssetsFiles(): Promise<IBaseAssetsFiles> {
        return new Promise((resolve) => {
            this._loader
                .add('furnidata', 'furnidata.json', { crossOrigin: true })
                .add('placeholder', 'item_placeholder_64.png', { crossOrigin: true })
                .add('tilecursor', 'TileCursor/TileCursor.json', { crossOrigin: true });
            this._loader.onComplete.once((params) => {
                const { resources } = params;
                resolve({
                    furniData: resources.furnidata.data as IFurniData,
                    // @ts-ignore
                    itemPlaceholderTexture: resources.placeholder.texture,
                    tileCursor: resources.tilecursor.textures,
                });
            });
            this._loader.load();
            this._loader.onLoad.add(this.loaded.bind(this));
            this._loader.onError.add(this.errored.bind(this));
        });
    }

    public load(id: string, request: Request<ILoaderResource>) {
        this._waitingAssets.set(id, request);
        this._loader.add(id, `${id}/${id}.json`, { crossOrigin: true });
    }
}

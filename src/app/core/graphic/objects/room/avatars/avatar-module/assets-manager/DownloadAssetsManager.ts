import { ILoaderResource, Loader } from 'pixi.js';
import { Memento, Request } from 'mementojs';
import { IFigureData } from '../interfaces/IFigureData';
import { IAvatarAssetsManager, IBaseAssetsFiles } from './interfaces/IAvatarAssetsManager';
import { Configuration } from '../../../../../../../../conf';

export class DownloadAssetsManager extends Memento<ILoaderResource> implements IAvatarAssetsManager {
    private _loader: Loader;
    private _waitingAssets: Map<string, Request<ILoaderResource>>;

    constructor() {
        super({ maxSimultaneousRequest: 20 });

        this._loader = new Loader(Configuration.images.figureDomain, 10);
        this._waitingAssets = new Map<string, Request<ILoaderResource>>();
    }

    private initBasicRequests() {
        if (this._loader.resources.figureData !== undefined) return;

        this.request('hh_human_acc_chest', () => {});
        this.request('hh_human_acc_eye', () => {});
        this.request('hh_human_acc_face', () => {});
        this.request('hh_human_acc_head', () => {});
        this.request('hh_human_acc_waist', () => {});
        this.request('hh_human_body', () => {});
        this.request('hh_human_face', () => {});
        this.request('hh_human_hair', () => {});
        this.request('hh_human_hats', () => {});
        this.request('hh_human_item', () => {});
        this.request('hh_human_leg', () => {});
        this.request('hh_human_shirt', () => {});
        this.request('hh_human_shoe', () => {});
    }

    private loaded(loader: Loader, ressource: ILoaderResource) {
        if (ressource.name.includes('_image')) {
            const assetName = ressource.name.substring(0, ressource.name.indexOf('_image'));
            const request = this._waitingAssets.get(assetName);
            if (request !== undefined) {
                if (this._loader.resources[assetName].spritesheet === undefined) {
                    setTimeout(() => {
                        request.setData(this._loader.resources[assetName]);
                        this._waitingAssets.delete(assetName);
                    }, 300);
                } else {
                    request.setData(this._loader.resources[assetName]);
                    this._waitingAssets.delete(assetName);
                }
            }
        }
    }

    private errored(error: any, loader: Loader, resource: ILoaderResource) {
        const assetName = resource.name.includes('_image') ? resource.name.substring(0, resource.name.indexOf('_image')) : resource.name;
        const request = this._waitingAssets.get(assetName);
        if (request !== undefined) {
            request.setError(`Clothes ${assetName} can't be loaded !`);
            this._waitingAssets.delete(assetName);
        }
    }

    public initBaseAssetsFiles(): Promise<IBaseAssetsFiles> {
        return new Promise((resolve) => {
            this._loader
                .add('figureData', 'figuredata.json', { crossOrigin: true });
            this._loader.onComplete.once((params) => {
                const { resources } = params;
                this.initBasicRequests();
                resolve({
                    figureData: resources.figureData.data as IFigureData,
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

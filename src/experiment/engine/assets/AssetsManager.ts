import { IAssetsManager } from './interface/IAssetsManager';
import { Loader, LoaderResource } from 'pixi.js';

export class AssetsManager extends Loader implements IAssetsManager {
    public constructor() {
        super(undefined, 5);

        this.add('badge', 'HC1.png');
    }

    public async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.load(() => {
                resolve();
            });
        });
    }

    public has(id: string, url: string): boolean {

        if (this.resources[id] === undefined) {
            this.add(id, url, { crossOrigin: true });

            return false;
        }

        return this.resources[id].isComplete !== false;
    }

    public get(id: string): LoaderResource {
        return this.resources[id];
    }
}

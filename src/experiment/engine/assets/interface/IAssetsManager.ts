import { LoaderResource } from 'pixi.js';

export interface IAssetsManager {
    has(id: string, url: string): boolean;
    get(id: string): LoaderResource;
}

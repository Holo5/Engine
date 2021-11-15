import { IFurniData } from '../../interfaces/IFurniData';
import { LoaderResource, Texture } from 'pixi.js';

export interface IItemAssetsManager {
    initBaseAssetsFiles(): IBaseAssetsFiles | Promise<IBaseAssetsFiles>;

    request(id: string, callback: (data: LoaderResource) => void): void;
}

export interface IBaseAssetsFiles {
    furniData: IFurniData,
    itemPlaceholderTexture: Texture,
    tileCursor: { [name: string]: Texture }
}

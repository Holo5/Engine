import * as PIXI from 'pixi.js';
import { IFigureData } from '../../interfaces/IFigureData';

export interface IAvatarAssetsManager {
    initBaseAssetsFiles(): IBaseAssetsFiles | Promise<IBaseAssetsFiles>;

    request(id: string, callback: (data: PIXI.LoaderResource) => void): void;
}

export interface IBaseAssetsFiles {
    figureData: IFigureData
}

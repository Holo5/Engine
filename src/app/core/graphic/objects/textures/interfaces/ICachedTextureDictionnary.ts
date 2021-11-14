import { WallGraphicTexture } from '../wall/textures/WallGraphicTexture';
import { FloorGraphicTexture } from '../floor/textures/FloorGraphicTexture';

export interface ICachedFloorTextureDictionnary {
    [textureName: string]: FloorGraphicTexture
}

export interface ICachedWallTextureDictionnary {
    [textureName: string]: WallGraphicTexture
}

export interface IRoomTexturingData {
    type: string;
    name: string;
    visualizationType: string;
    logicType: string;
    spritesheet: string;
    assets: IAssets;
    wallData: IWallData & ISurfaceData;
    floorData: IFloorData & ISurfaceData;
    landscapeData: ILandscapeData;
    maskData: IMaskData;
}

interface IAssets {
    [key: string]: IAssetData;
}

interface IAssetData {
    source?: string;
    x: string;
    y: string;
    flipH?: boolean;
}

interface IFloorData {
    floors: ISurface[];
}

interface IWallData {
    walls: ISurface[];
}

interface ISurfaceData {
    materials: ISurfaceDataMaterial[];
    textures: ITexture[];
}

interface ISurface {
    id: string;
    visualizations: IFloorVisualization[];
}

interface IFloorVisualization {
    size: number;
    layers: ILayer[];
}

interface ILayer {
    color?: number;
    materialId?: string;
}

interface ISurfaceDataMaterial {
    id: string;
    matrices: ISurfaceMatrix[];
}

interface ISurfaceMatrix {
    columns: ISurfaceMatrixColumn[];
}

interface ISurfaceMatrixColumn {
    width: number;
    cells: ISurfaceMatrixCell[];
}

interface ISurfaceMatrixCell {
    textureId: string;
}

interface ITexture {
    id: string;
    bitmaps: IBitmap[];
}

interface IBitmap {
    assetName: string;
}

interface ILandscapeData {
    landscapes: ILandscape[];
    materials: ILandscapeDataMaterial[];
    textures: ITexture[];
}

interface ILandscape {
    id: string;
    animatedVisualizations: IAnimatedVisualization[];
}

interface IAnimatedVisualization {
    size: number;
    layers: ILayer[];
    animationLayers?: IAnimationLayer[];
}

interface IAnimationLayer {
    animationItems: IAnimationItem[];
}

interface IAnimationItem {
    id: number;
    assetId: string;
    speedX: number;
    randomX: string;
    randomY: string;
}

interface ILandscapeDataMaterial {
    id: string;
    matrices: ILandscapeMatrix[];
}

interface ILandscapeMatrix {
    repeatMode?: MatrixRepeatMode;
    align?: Align;
    columns: ILandscapeMatrixColumn[];
}

export enum Align {
    Bottom = 'bottom',
}

interface ILandscapeMatrixColumn {
    repeatMode?: ColumnRepeatMode;
    width: number;
    cells: ILandscapeMatrixCell[];
}

interface ILandscapeMatrixCell {
    textureId: string;
    extras?: IExtra[];
}

interface IExtra {
    limitMax: number;
    types: IType[];
    offsets?: IExtraOffset[];
}

interface IExtraOffset {
    offsets: IOffset[];
}

interface IOffset {
    id: number;
    x?: number;
    y?: number;
}

interface IType {
    types: IBitmap[];
}

export enum ColumnRepeatMode {
    None = 'none',
}

export enum MatrixRepeatMode {
    Random = 'random',
}

interface IMaskData {
    masks: IMask[];
}

interface IMask {
    id: string;
    visualizations: IMaskVisualization[];
}

interface IMaskVisualization {
    size: number;
    bitmaps: IBitmap[];
}

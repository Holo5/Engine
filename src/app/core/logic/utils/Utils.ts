export enum DepthType {
    TILE = 1,
    BLACK_BOX = 1000,
    AVATAR = 1000,
    FURNI = 1000,
}

export enum NameType {
    TILE = 'TILE',
    STAIRS = 'STAIRS',
    AVATAR = 'AVATAR',
}

export class Utils {
    public static computeDepth(mapX: number, mapY: number, depthType: DepthType) {
        return (mapX + mapY) * depthType;
    }

    public static computeName(mapX: number, mapY: number, nameType: NameType) {
        return `${nameType.toString()}_${mapX};${mapY}`;
    }
}

export interface IEngineOption {
    canvasContainer: HTMLElement,
    width: number,
    height: number,
    autoResize: boolean,
    backgroundAlpha: number,
    maxAnimationRate: number,
    maxDisplayRate: number,
    mouseEventFrequency: number

    images: {
        imageDomain: string,
        badgeDomain: string,
        furnitureDomain: string,
        figureDomain: string
    },
    room: {
        tiles: {
            defaultMaterial: string,
            defaultThickness: number
        },
        walls: {
            defaultMaterial: string,
            defaultThickness: number,
            defaultHeight: number
        }
    },
}

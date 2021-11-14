export interface IFigureData {
    colorPalettes: IColorPalettes,
    setTypes: ISetTypes,
    draworder: IDraworder
}

export interface IDraworder {
    [action: string]: {
        [direction: string]: string[]
    }
}

export interface IColorPalettes {
    [paletteId: string]: IColors
}

export interface IColors {
    [colorId: string]: IColor
}

export interface IColor {
    index: string,
    club: string,
    selectable: string,
    color: string
}

export interface ISetTypes {
    [type: string]: ISetType
}

export interface ISetType {
    paletteid: string,
    mand_m_0: string,
    mand_f_0: string,
    mand_m_1: string,
    mand_f_1: string,
    sets: {
        [id: string]: ISet
    }
}

export interface ISet {
    gender: string,
    club: string,
    colorable: string,
    selectable: string,
    preselectable: string,
    sellable: string,
    parts: IPart[],
    hiddenparts: IHiddenPart[]
}

export interface IPart {
    id: string,
    type: string,
    colorable: string,
    index: string,
    colorindex: string,
    assetname: string,
}

export interface IHiddenPart {
    partType: string
}

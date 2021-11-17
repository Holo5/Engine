import { AvatarPosture } from '../enums/AvatarPosture';
import { BaseFigureDataPart } from './BaseFigureDataPart';
import { ExpandedFigureDataPart } from './ExpandedFigureDataPart';
import { IFigureData, IHiddenPart, IPart, ISet, ISetType } from '../interfaces/IFigureData';

export class FigureDataManager {
    private _figureData: IFigureData;

    init(figureData: IFigureData) {
        this._figureData = figureData;
    }

    retrieveExpandedParts(baseFigureDataParts: BaseFigureDataPart[]): ExpandedFigureDataPart[] {
        let expandedFigureDataParts: ExpandedFigureDataPart[] = [];
        const hiddenPartsToExclude: string[] = [];
        baseFigureDataParts.forEach((baseFigureDataPart) => {
            const setType: ISetType = this._figureData?.setTypes[baseFigureDataPart.type];
            const set: ISet = setType?.sets[baseFigureDataPart.id];
            const parts: IPart[] = set?.parts;
            const hiddenParts: IHiddenPart[] = set?.hiddenparts;

            hiddenParts?.forEach((hp) => {
                hiddenPartsToExclude.push(hp.partType);
            });

            if (setType && set && parts && hiddenParts) {
                parts.forEach((part) => {
                    let color: string | false = false;
                    if (baseFigureDataPart.color !== undefined && part.colorable) {
                        color = this._figureData.colorPalettes[setType.paletteid][baseFigureDataPart.color] !== undefined
                            ? this._figureData.colorPalettes[setType.paletteid][baseFigureDataPart.color].color : false;

                        if (color === false) {
                            Object.keys(this._figureData.colorPalettes[setType.paletteid])
                                .forEach((colorId) => {
                                    if (this._figureData.colorPalettes[setType.paletteid][colorId].index === baseFigureDataPart.color.toString()) {
                                        color = this._figureData.colorPalettes[setType.paletteid][colorId].color;
                                    }
                                });
                        }
                    }

                    expandedFigureDataParts.push(new ExpandedFigureDataPart(
                        part.id,
                        part.assetname,
                        parseInt(part.index),
                        part.type,
                        color,
                    ));
                });
            }
        });

        expandedFigureDataParts = expandedFigureDataParts
            .filter((value) => hiddenPartsToExclude.indexOf(value.type) === -1);

        return expandedFigureDataParts;
    }

    findDraworder(posture: AvatarPosture, direction: string) {
        return this._figureData.draworder.vertical[direction];
    }
}

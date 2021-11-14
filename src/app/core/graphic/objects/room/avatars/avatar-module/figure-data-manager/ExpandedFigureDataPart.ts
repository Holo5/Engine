import { AvatarPosture } from '../enums/AvatarPosture';

export class ExpandedFigureDataPart {
    public id: string;
    public assetName: string;
    public index: number;
    public type: string;
    public color: string | false;
    public defaultDirection: string;
    public defaultAction: string;
    public defaultVisible: boolean;

    constructor(
        id: string,
        assetName: string,
        index: number,
        type: string,
        color: string | false,
        defaultAction: string = AvatarPosture.POSTURE_STAND,
        defaultDirection: string = '2',
        defaultVisible: boolean = true,
    ) {
        this.id = id;
        this.assetName = assetName;
        this.index = index;
        this.type = type;
        this.color = color;
        this.defaultDirection = defaultDirection;
        this.defaultAction = defaultAction;
        this.defaultVisible = defaultVisible;
    }

    formattedDefaultFrameName() {
        return `${this.type}_${this.id}_${this.defaultAction}_${this.defaultDirection}`;
    }

    toAnotherId(id: string) {
        return new ExpandedFigureDataPart(
            id,
            this.assetName,
            this.index,
            this.type,
            this.color,
            this.defaultDirection,
            this.defaultAction,
            this.defaultVisible,
        );
    }
}

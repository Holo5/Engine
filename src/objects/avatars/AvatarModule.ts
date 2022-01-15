import { Avatar } from './avatar-parts/Avatar';
import { AvatarPosture } from './enums/AvatarPosture';
import { BaseFigureDataPart } from './figure-data-manager/BaseFigureDataPart';
import { Configuration } from '../../../example/conf';
import { Engine } from '../../Engine';
import { ExpandedFigureDataPart } from './figure-data-manager/ExpandedFigureDataPart';
import { FigureDataManager } from './figure-data-manager/FigureDataManager';
import { GeometryManager } from './figure-data-manager/geometry/GeometryManager';
import { IFigureData } from './interfaces/IFigureData';

export class AvatarModule {

    private figureDataManager: FigureDataManager;
    private geometryManager: GeometryManager;

    constructor(
        public engine: Engine,
    ) {
        this.engine.assetsManager.has('figureData', Configuration.images.figureDomain + 'figuredata.json');
        this.engine.assetsManager.has('hh_human_acc_chest', Configuration.images.figureDomain + 'hh_human_acc_chest/hh_human_acc_chest.json');
        this.engine.assetsManager.has('hh_human_acc_eye', Configuration.images.figureDomain + 'hh_human_acc_eye/hh_human_acc_eye.json');
        this.engine.assetsManager.has('hh_human_acc_face', Configuration.images.figureDomain + 'hh_human_acc_face/hh_human_acc_face.json');
        this.engine.assetsManager.has('hh_human_acc_head', Configuration.images.figureDomain + 'hh_human_acc_head/hh_human_acc_head.json');
        this.engine.assetsManager.has('hh_human_acc_waist', Configuration.images.figureDomain + 'hh_human_acc_waist/hh_human_acc_waist.json');
        this.engine.assetsManager.has('hh_human_body', Configuration.images.figureDomain + 'hh_human_body/hh_human_body.json');
        this.engine.assetsManager.has('hh_human_face', Configuration.images.figureDomain + 'hh_human_face/hh_human_face.json');
        this.engine.assetsManager.has('hh_human_hair', Configuration.images.figureDomain + 'hh_human_hair/hh_human_hair.json');
        this.engine.assetsManager.has('hh_human_hats', Configuration.images.figureDomain + 'hh_human_hats/hh_human_hats.json');
        this.engine.assetsManager.has('hh_human_item', Configuration.images.figureDomain + 'hh_human_item/hh_human_item.json');
        this.engine.assetsManager.has('hh_human_leg', Configuration.images.figureDomain + 'hh_human_leg/hh_human_leg.json');
        this.engine.assetsManager.has('hh_human_shirt', Configuration.images.figureDomain + 'hh_human_shirt/hh_human_shirt.json');
        this.engine.assetsManager.has('hh_human_shoe', Configuration.images.figureDomain + 'hh_human_shoe/hh_human_shoe.json');

        this.figureDataManager = new FigureDataManager();
        this.geometryManager = new GeometryManager();
    }

    init() {
        this.figureDataManager.init(this.engine.assetsManager.get('figureData').data as IFigureData);
        this.geometryManager.init();
    }

    buildFromFigure(figure: string): Avatar {
        const baseFigureDataParts: BaseFigureDataPart[] = figure.split('.')
            .map((value) => {
                return BaseFigureDataPart.fromValue(value);
            });

        const expandedFigureDataParts: ExpandedFigureDataPart[] = this.figureDataManager.retrieveExpandedParts(baseFigureDataParts);

        expandedFigureDataParts.push(new ExpandedFigureDataPart('1', 'hh_human_body', 0, 'bd', false, AvatarPosture.POSTURE_STAND, '0'));
        // expandedFigureDataParts.push(new ExpandedFigureDataPart('1', 'hh_human_body', 1, 'hd', false, AvatarPosture.POSTURE_STAND, '0'));
        // expandedFigureDataParts.push(new ExpandedFigureDataPart('69', 'hh_human_item', 0, 'ri', false, AvatarGesture.GESTURE_CARRY));
        // expandedFigureDataParts.push(new ExpandedFigureDataPart('1', 'hh_human_item', 0, 'li', false, AvatarGesture.GESTURE_SIGNAL));

        const avatar = new Avatar(this.engine, this.geometryManager);
        avatar.setRenderer(this.engine.renderer);
        avatar.loadExpandedFigureDataParts(...expandedFigureDataParts);

        return avatar;
    }
}

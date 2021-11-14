import { RoomVisualizationType } from './enums/RoomVisualizationType';
import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';
import { FurnitureVisualization } from './FurnitureVisualization';

export class VisualizationFactory {
    public static buildVisualizationFactory(type: RoomVisualizationType): typeof FurnitureVisualization | typeof AnimatedFurnitureVisualization {
        switch (type) {
            case RoomVisualizationType.FURNITURE_STATIC:
                return FurnitureVisualization;
            case RoomVisualizationType.FURNITURE_ANIMATED:
                return AnimatedFurnitureVisualization;
            default:
                return FurnitureVisualization;
        }
    }
}

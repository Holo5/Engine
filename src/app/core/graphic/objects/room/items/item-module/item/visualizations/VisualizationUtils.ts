export class VisualizationUtils {
    public static LAYER_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    public static toLayerName(layerId: number) {
        return this.LAYER_NAMES[layerId];
    }
}

import { Incoming } from '../../Incoming';
import { GiftWrappingConfiguration } from '../../../../../logic/catalog/data/GiftWrappingConfiguration';

export class GiftWrappingConfigurationEvent extends Incoming {
    process(): void {
        const isEnabled = this.packet.readBoolean();
        const price = this.packet.readInt();
        const newBoxes = this.processLoop();
        const boxType = this.processLoop();
        const ribbonType = this.processLoop();
        const oldBoxes = this.processLoop();

        const giftWrappingConfig = new GiftWrappingConfiguration(
            isEnabled,
            price,
            newBoxes,
            boxType,
            ribbonType,
            oldBoxes,
        );

        this.core.gameManager.catalogManager.giftWrappingManager.setConfiguration(giftWrappingConfig);
    }

    private processLoop(): number[] {
        const loopSize = this.packet.readInt();
        const finalElements: number[] = [];

        for (let i = 0; i < loopSize; i++) {
            const element = this.packet.readInt();

            finalElements.push(element);
        }

        return finalElements;
    }
}

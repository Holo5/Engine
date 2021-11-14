import { Incoming } from '../../Incoming';

export class UnseenItemEvent extends Incoming {
    process(): void {
        const pagesSize = this.packet.readInt();

        for (let i = 0; i < pagesSize; i++) {
            const unknownInt = this.packet.readInt();
            const itemsSize = this.packet.readInt();

            this.processItems(itemsSize);
        }
    }

    processItems(itemsSize: number): void {
        for (let j = 0; j < itemsSize; j++) {
            const itemId = this.packet.readInt();

            this.core.player.playerInventory.highlightItem(itemId);
        }
    }
}

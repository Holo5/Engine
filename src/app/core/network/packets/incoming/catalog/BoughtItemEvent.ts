import { Incoming } from '../Incoming';

export class BoughtItemEvent extends Incoming {
    process(): void {
        const itemTypeCheck = this.packet.readNextInt();

        // TODO clean unused process

        if (itemTypeCheck === 6165) {
            this.processGroupItem();
        } else if (itemTypeCheck === 0) {
            this.processUnknown();
        } else {
            this.processItem();
        }

        this.core.store.commit('catalog/displayBuyConfirmation', false);
    }

    private processGroupItem(): void {
        // const unusedGroupChecker = this.packet.readInt();
        // const type = this.packet.readString();
        //
        // const unknownBoolean = this.packet.readBoolean();
        //
        // const costCredits = this.packet.readInt();
        // const costOtherCurrency1 = this.packet.readInt();
        // const costOtherCurrency2 = this.packet.readInt();
        //
        // const unknownBoolean2 = this.packet.readBoolean();
        // const unknownInt = this.packet.readInt();
        // const unknownInt2 = this.packet.readInt();
        // const unknownBoolean3 = this.packet.readBoolean();
    }

    private processItem(): void {
        // const itemId = this.packet.readInt();
        //
        // const itemDisplayName = this.packet.readString();
        // const unknownBoolean = this.packet.readBoolean();
        //
        // const costCredits = this.packet.readInt();
        // const costOtherCurrency1 = this.packet.readInt();
        // const costOtherCurrency2 = this.packet.readInt();
        //
        // const itemCanGift = this.packet.readBoolean();
        // const itemBundleSize = this.packet.readInt();
        //
        // const itemType = this.packet.readString();
        // const spriteId = this.packet.readShort();
        //
        // const unknownString = this.packet.readString();
        // const unknownInt3 = this.packet.readInt();
        // const unknownString2 = this.packet.readString();
        // const unknownInt4 = this.packet.readInt();
    }

    private processUnknown(): void {
        // this.packet.readInt();
        // this.packet.readString();
        // this.packet.readBoolean();
        // this.packet.readInt();
        // this.packet.readInt();
        // this.packet.readInt();
        // this.packet.readBoolean();
        // this.packet.readInt();
        // this.packet.readString();
        // this.packet.readInt();
        // this.packet.readString();
        // this.packet.readInt();
        // this.packet.readInt();
        // this.packet.readString();
        // this.packet.readInt();
    }
}

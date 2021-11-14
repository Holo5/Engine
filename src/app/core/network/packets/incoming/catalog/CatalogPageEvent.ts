import { Incoming } from '../Incoming';
import { CatalogItem } from '../../../../logic/catalog/items/CatalogItem';
import { CatalogPageItems } from '../../../../logic/catalog/CatalogPageItems';

export class CatalogPageEvent extends Incoming {
    public process(): void {
        const pageId = this.packet.readInt();
        const pageType = this.packet.readString();
        const pageTemplate = this.packet.readString();
        const imagesLength = this.packet.readInt();
        const images: string[] = [];

        for (let i = 0; i < imagesLength; i++) {
            images.push(this.packet.readString());
        }

        const textsLength = this.packet.readInt();
        const texts: string[] = [];

        for (let i = 0; i < textsLength; i++) {
            texts.push(this.packet.readString());
        }

        const catalogPageItems = new CatalogPageItems(pageId, pageType, pageTemplate, images, texts);
        const itemsLength = this.packet.readInt();

        for (let i = 0; i < itemsLength; i++) {
            const itemId = this.packet.readInt();
            const itemDisplayName = this.packet.readString();
            const unknownBoolean1 = this.packet.readBoolean();
            const itemCostCredit = this.packet.readInt();

            // For other currencies
            const costOtherCurrency1 = this.packet.readInt();
            const costOtherCurrency2 = this.packet.readInt();
            const itemCanGift = this.packet.readBoolean();

            const itemBundleSize = this.packet.readInt();

            // Badge
            let hasBadge: boolean = false;
            let badgeCode: string = '';

            // Only badge
            if (itemBundleSize === 2) {
                const type = this.packet.readString();

                if (type === 'b') {
                    hasBadge = true;
                    badgeCode = this.packet.readString();
                }

                const badgeId = this.packet.readString();
                const bundleSpriteId = this.packet.readInt();
                const bundlePresetData = this.packet.readString();
                const bundleItemNumber = this.packet.readInt();
                const bundleLimitedTotal = this.packet.readBoolean();

                if (bundleLimitedTotal) {
                    const bundleLimit = this.packet.readInt();
                    const bundleLimitLeft = this.packet.readInt();
                }
            }

            // Real bundle !
            if (itemBundleSize === 1) {
                const type = this.packet.readString();

                // Pseudocolor / Emoticone / Badge
                if (type === 'b') {
                    const bundleItemName = this.packet.readString();
                } else {
                    const bundleSpriteId = this.packet.readInt();
                    const bundlePresetData = this.packet.readString();
                    const bundleItemNumber = this.packet.readInt();
                    const bundleLimitedTotal = this.packet.readBoolean();

                    if (bundleLimitedTotal) {
                        const bundleLimit = this.packet.readInt();
                        const bundleLimitLeft = this.packet.readInt();
                    }
                }
            }

            const itemClubLevel = this.packet.readInt();
            const itemLimited = !this.packet.readBoolean();
            const unknownBool2 = this.packet.readBoolean();
            const unknownString2 = this.packet.readString();

            const itemData = this.core.engine.itemModule.getCatalogItemFurniData(itemDisplayName);
            const itemDataName = itemData ? itemData.name : itemDisplayName;

            catalogPageItems.addCatalogItem(
                CatalogItem.fromDatas(
                    itemId,
                    itemDisplayName,
                    '000',
                    itemCostCredit,
                    costOtherCurrency1,
                    costOtherCurrency2,
                    itemCanGift,
                    itemLimited,
                    itemDataName,
                    hasBadge,
                    badgeCode,
                ),
            );
        }

        this.core.store.commit('catalog/setCatalogPageItems', catalogPageItems);
    }
}

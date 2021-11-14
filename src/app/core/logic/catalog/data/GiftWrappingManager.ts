import { GiftWrappingConfiguration } from './GiftWrappingConfiguration';
import { Core } from '../../../Core';
import { FurniData } from '../../../graphic/objects/room/items/item-module/assets-manager/FurniData';
import { IStuffItem } from './interfaces/IStuffItem';

export class GiftWrappingManager {
    public configuration: GiftWrappingConfiguration;

    constructor(public core: Core) {
        this.configuration = null;
    }

    public async setConfiguration(config: GiftWrappingConfiguration): Promise<void> {
        const finalConfig: GiftWrappingConfiguration = config;

        finalConfig.stuffItems = await this.resolveStuffItem(finalConfig);

        this.configuration = finalConfig;

        this.commitToStore();
        this.display();
    }

    private resolveStuffItem(config: GiftWrappingConfiguration): IStuffItem[] {
        const items: IStuffItem[] = [];

        config.stuffTypes.forEach(async (id: number) => {
            const giftFurniData: FurniData = await this.core.engine.itemModule.getGiftItemFurniData(id);

            items.push({
                itemId: id,
                furniData: giftFurniData,
            });
        });

        return items;
    }

    private commitToStore(): void {
        this.core.store.dispatch('catalog/setGiftConfiguration', this.configuration);
    }

    private display(): void {
        this.core.store.commit('catalog/displayGiftSender', true);
    }
}

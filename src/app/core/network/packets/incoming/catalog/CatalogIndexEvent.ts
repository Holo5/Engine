import { Incoming } from '../Incoming';
import { CatalogPage } from '../../../../logic/catalog/CatalogPage';

export class CatalogIndexEvent extends Incoming {
    public process(): void {
        this.packet.readBoolean();
        this.packet.readInt();
        this.packet.readInt();
        this.packet.readString();
        this.packet.readString();
        this.packet.readInt();

        const catalogPages: CatalogPage[] = [];
        const pagesLength = this.packet.readInt();

        for (let i = 0; i < pagesLength; i++) {
            catalogPages.push(this.getCatalogPage());
        }

        this.packet.readBoolean();
        this.packet.readString();

        this.core.store.dispatch('catalog/insertCatalogPages', catalogPages);
    }

    getCatalogPage(): CatalogPage {
        this.packet.readBoolean();

        const icon = this.packet.readInt();
        const id = this.packet.readInt();
        const linkName = this.packet.readString();
        const caption = this.packet.readString();
        const offerSize = this.packet.readInt();

        const catalogPage = new CatalogPage(id, icon, linkName, caption);

        for (let j = 0; j < offerSize; j++) {
            catalogPage.addItem(this.packet.readInt());
        }

        const pageLength = this.packet.readInt();

        for (let k = 0; k < pageLength; k++) {
            catalogPage.addPage(this.getCatalogPage());
        }

        return catalogPage;
    }
}

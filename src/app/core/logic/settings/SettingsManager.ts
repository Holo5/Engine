import { RoomCategory } from './RoomCategory';
import { Rating } from './Rating';
import { Tags } from './Tags';
import { SettingsData } from './SettingsData';
import { Core } from '../../Core';
import { Manager } from '../Manager';

export class SettingsManager extends Manager {
    public roomCategories: RoomCategory[];
    public rating: Rating;
    public tags: Tags;
    public settingsData: SettingsData;

    constructor(public core: Core) {
        super(core);

        this.tags = new Tags();
    }

    public setCategoriesAvailable(categories: RoomCategory[]) {
        this.roomCategories = categories;

        this.core.store.commit('roomCreation/setCategoriesAvailable', categories);
        this.core.store.commit('roomSettings/setCategoriesAvailable', categories);
    }

    public setRating(rating: Rating) {
        this.rating = rating;

        this.core.store.commit('room/setRating', rating);
    }

    public setSettingsData(settingsData: SettingsData) {
        this.settingsData = settingsData;

        this.core.store.dispatch('roomSettings/setRoomSettingsData', settingsData);
    }

    public clear(): void {
    }
}

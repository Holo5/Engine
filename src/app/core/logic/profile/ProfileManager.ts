import { Core } from '../../Core';
import { Profile } from './Profile';
import { Relationship } from './Relationship';
import { GetRelationshipComposer } from '../../network/packets/outgoing/user/profile/GetRelationshipComposer';
import { GetSelectedBadgesComposer } from '../../network/packets/outgoing/user/profile/GetSelectedBadgesComposer';
import { Badge } from '../badge/Badge';
import { Group } from '../group/Group';
import { GetGroupInfoComposer } from '../../network/packets/outgoing/group/getGroupInfoComposer';
import { ERelationshipLevel } from './interfaces/ERelationshipLevel';

export class ProfileManager {
    public profile: Profile;
    public profileDisplayed: boolean;
    public initialized: boolean;

    private _needGroup: boolean;

    constructor(public core: Core) {
        this.profile = null;
        this.initialized = false;

        this._needGroup = false;
    }

    public displayProfile(profile: Profile) {
        this.profile = profile;

        this.core.store.dispatch('profile/displayProfilePopup', profile);
        this.displayProfileInStore(true);

        if (profile.totalGroups > 0) {
            this.loadGroup(profile.groups[0].id);
        }

        this.core.network.socketClient.processOutgoing(new GetRelationshipComposer(profile.id));
        this.core.network.socketClient.processOutgoing(new GetSelectedBadgesComposer(profile.id));
    }

    public displayProfileInStore(display: boolean) {
        this.profileDisplayed = display;

        this.core.store.commit('profile/setProfilePopupDisplayed', display);
    }

    public setRelationships(relationships: Relationship[]) {
        this.profile.setRelationships(relationships);

        this.core.store.commit('profile/setProfile', this.profile);
    }

    public setBadges(badges: Badge[]) {
        this.profile.setBadges(badges);

        this.core.store.commit('profile/setProfile', this.profile);
    }

    public loadGroup(groupId: number) {
        this._needGroup = true;

        this.core.network.socketClient.processOutgoing(new GetGroupInfoComposer(groupId));
    }

    public setGroup(group: Group) {
        if (this._needGroup) {
            this._needGroup = false;

            this.core.store.commit('profile/setGroup', group);
        }
    }
}

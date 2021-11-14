import { Incoming } from '../../Incoming';
import { Relationship } from '../../../../../logic/profile/Relationship';
import { ERelationshipLevel } from '../../../../../logic/profile/interfaces/ERelationshipLevel';

export class LoadRelationshipsEvent extends Incoming {
    public process(): void {
        const clientUserId = this.packet.readInt();
        const relationshipsWidth = this.packet.readInt();
        const relationships: Relationship[] = [];

        for (let i = 0; i < relationshipsWidth; i++) {
            const relationship = this.processRelationship();

            relationships.push(relationship);
        }

        if (this.core.gameManager.profileManager.profileDisplayed) {
            this.core.gameManager.profileManager.setRelationships(relationships);
        }

        if (clientUserId === this.core.player.playerData.id) {
            this.core.player.setPlayerRelationships(relationships);
        }
    }

    private processRelationship(): Relationship {
        const levelId = this.packet.readInt();
        const othersUsersWithLevel = this.packet.readInt();
        const userId = this.packet.readInt();
        const username = this.packet.readString();
        const figure = this.packet.readString();

        // eslint-disable-next-line no-nested-ternary
        const level = levelId === 1 ? ERelationshipLevel.HEART : levelId === 2 ? ERelationshipLevel.SMILE : ERelationshipLevel.BOBBA;

        return new Relationship(
            userId,
            level,
            username,
            figure,
        );
    }
}

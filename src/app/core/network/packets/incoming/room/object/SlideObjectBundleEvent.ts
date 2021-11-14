import { Incoming } from '../../Incoming';

export class SlideObjectBundleEvent extends Incoming {
    public process(): void {
        /*
         msg.writeInt(from.getX());
         msg.writeInt(from.getY());

         msg.writeInt(to.getX());
         msg.writeInt(to.getY());

         msg.writeInt(this.items.size());

         for (Map.Entry<Integer, Double> item : this.items.entrySet()) {
             msg.writeInt(item.getKey());

             // we want to ensure we slide to the same height as we were previously at.
             msg.writeDouble(item.getValue());
             msg.writeDouble(item.getValue());
         }

         msg.writeInt(this.rollerItemId);

         if (this.avatarId != 0) {
         // 1 = mv, 2 = std
         msg.writeInt(2);

         msg.writeInt(this.avatarId);
         msg.writeDouble(from.getZ());
         msg.writeDouble(to.getZ());
         }
         */

        const startX = this.packet.readInt();
        const startY = this.packet.readInt();

        const endX = this.packet.readInt();
        const endY = this.packet.readInt();

        const size = this.packet.readInt();

        for (let i = 0; i < size; i++) {
            const itemId = this.packet.readInt();

            const unknown1 = this.packet.readInt();
            const unknown2 = this.packet.readInt();
        }

        const rollerId = this.packet.readInt();
    }
}

import { createEventDefinition } from 'ts-bus/EventBus';
import { FurnitureItem } from '../graphic/objects/room/items/item-module/item/FurnitureItem';

export const FurnitureClickedEvent = createEventDefinition<{ furnitureItem: FurnitureItem }>()('furniture.clicked');

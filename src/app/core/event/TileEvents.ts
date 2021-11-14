import { createEventDefinition } from 'ts-bus/EventBus';
import { IVector3D } from '@holo5/roombuilder';

export const TileClickedEvent = createEventDefinition<{ mapPosition: IVector3D }>()('tile.clicked');
export const TileHoveredEvent = createEventDefinition<{ mapPosition: IVector3D, stackHeight: number }>()('tile.hovered');
export const TileRestedEvent = createEventDefinition<{ mapPosition: IVector3D }>()('tile.rested');

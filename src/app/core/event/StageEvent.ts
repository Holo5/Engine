import { createEventDefinition } from 'ts-bus/EventBus';

export const OutsideStageClickedEvent = createEventDefinition<{}>()('stage.outside.clicked');

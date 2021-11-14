import { ChatBubble } from '../../../../../core/logic/chat/ChatBubble';

export interface Bubble {
    id: number,
    top: number,
    left: number,
    parentWidth: number,
    rect: {
        x: number,
        y: number,
        width: number,
        height: number,
    },
    bubble: ChatBubble,
}

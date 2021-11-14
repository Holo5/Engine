import { ChatBubble } from './ChatBubble';
import { Core } from '../../Core';
import { ChatColour } from './ChatColour';
import { ChatStyles } from './ChatStyles';
import { ChatMessageComposer } from '../../network/packets/outgoing/room/chat/ChatMessageComposer';
import { Configuration } from '../../../../conf';
import { WhisperMessageComposer } from '../../network/packets/outgoing/room/chat/WhisperMessageComposer';
import { Manager } from '../Manager';
import { AvatarGesture } from '../../graphic/objects/room/avatars/avatar-module/enums/AvatarGesture';

export class ChatManager extends Manager {
    private _chatBubbles: ChatBubble[];
    private _chatMode: 'speak' | 'whisper';
    private _whisperUsername: string;

    constructor(public core: Core) {
        super(core);

        this._chatBubbles = [];

        this.core.store.dispatch('chatPanel/initChatPanel');
    }

    enableWhisperMode(username: string) {
        this._chatMode = 'whisper';
        this._whisperUsername = username;

        this.core.store.commit('chatBar/setMessage', `${Configuration.chats.whisperCommand} ${username} `);
    }

    disableWhisperMode() {
        this._chatMode = 'speak';
        this._whisperUsername = '';

        this.core.store.commit('chatBar/setMessage', '');
    }

    publishMessage(unitId: number, unitMessage: string, bubbleId: number, whisper: boolean = false) {
        const unit = this.gameManager.unitManager.find(unitId);

        if (unit !== undefined) {
            const [cleanMessage, textColor] = ChatColour.extractColourFromMessage(unitMessage);
            const bubbleStyle = ChatStyles.getFromId(bubbleId);

            const chatBubble = new ChatBubble(
                unitId,
                unit.username,
                '',
                cleanMessage,
                unit.avatarGraphic.graphic.getGlobalPosition().x,
                textColor,
                bubbleStyle,
                whisper,
            );

            this.core.gameManager.historyManager.addMessage(unit.username, cleanMessage, whisper);
            this.addBubble(chatBubble);

            if (!unit.disposed) {
                setTimeout(() => {
                    if (!unit.disposed) {
                        unit.updateGesture(AvatarGesture.GESTURE_STAND);
                    }
                }, unitMessage.length * 50);
                unit.updateGesture(AvatarGesture.GESTURE_SPEAK);
            }
        }
    }

    setUserFlood(seconds: number) {
        this.core.store.dispatch('chatBar/userIsFlood', seconds);
    }

    addBubble(bubble: ChatBubble) {
        this._chatBubbles.push(bubble);

        this.core.store.dispatch('chatPanel/addBubble', bubble);
    }

    clearBubbles() {
        this._chatBubbles = [];

        this.core.store.commit('chatPanel/clearBubbles');
    }

    sendMessage(message: string, bubble: number) {
        if (message.startsWith(Configuration.chats.whisperCommand)) {
            const messageSplitted = message.split(' ');
            const username = messageSplitted[1];
            const messageWithoutCommand = messageSplitted.slice(1).join(' ').trim();

            this.enableWhisperMode(username);
            this.core.network.socketClient.processOutgoing(new WhisperMessageComposer(messageWithoutCommand));
        } else {
            this.disableWhisperMode();
            this.core.network.socketClient.processOutgoing(new ChatMessageComposer(message, bubble));
        }
    }

    public clear(): void {
    }
}

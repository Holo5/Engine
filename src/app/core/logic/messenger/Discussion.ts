import { Message } from './Message';
import { Friend } from '../console/Friend';

export class Discussion {
    public user: Friend;
    public messages: Message[];
    public canSendMessage: boolean;

    constructor(user: Friend) {
        this.user = user;
        this.messages = [];
        this.canSendMessage = true;
    }

    public messagesUnviewed(): number {
        return this.messages.filter((message: Message) => !message.viewed).length;
    }
}

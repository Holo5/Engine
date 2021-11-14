import { RoomVisit } from './RoomVisit';
import { Chat } from './Chat';
import { Manager } from '../Manager';

export class HistoryManager extends Manager {
    private getCurrentFormattedDate(): string {
        const date = new Date();

        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    public addMessage(from: string, message: string, whisper: boolean = false): void {
        const time = this.getCurrentFormattedDate();
        const chatMessage = new Chat(from, message, time, whisper);

        this.store.dispatch('chatHistory/publishMessage', chatMessage);
    }

    public addRoomVisit(roomName: string): void {
        const time = this.getCurrentFormattedDate();
        const message = new RoomVisit(roomName, time);

        this.store.dispatch('chatHistory/publishMessage', message);
    }

    public clear(): void {
    }
}

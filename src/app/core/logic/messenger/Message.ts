export class Message {
    public messageType: 'system' | 'received' | 'sent' | 'error' | 'invitation';
    public userId: number;
    public message: string;
    public viewed: boolean;
    public date: Date;

    constructor(
        messageType: 'system' | 'received' | 'sent' | 'error' | 'invitation',
        authorId: number,
        message: string,
        viewed: boolean = false,
    ) {
        this.messageType = messageType;
        this.userId = authorId;
        this.message = message;

        this.viewed = viewed;
        this.date = new Date();
    }

    public formattedDate(): string {
        return this.date.toLocaleDateString();
    }
}

import { HistoryLine } from './HistoryLine';
import { EHistoryLineType } from './enum/EHistoryLineType';

export class RoomVisit extends HistoryLine {
    constructor(roomName: string, time: string) {
        super(roomName, EHistoryLineType.ROOM, time);
    }
}

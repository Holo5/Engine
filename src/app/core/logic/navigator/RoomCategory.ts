import { Room } from './Room';

export class RoomCategory {
    public id: string;
    public name: string;
    public searchable: boolean;
    public collapsed: boolean;
    public viewMod: boolean;
    public rooms: Room[];

    constructor(id: string, name: string, searchable: boolean, collapsed: boolean, viewMod: boolean) {
        this.id = id;
        this.name = name;
        this.searchable = searchable;
        this.collapsed = collapsed;
        this.viewMod = viewMod;

        this.rooms = [];
    }

    addRoom(room: Room) {
        this.rooms.push(room);
    }

    getRoomById(roomId: number): Room {
        return this.rooms.filter((room: Room) => room.id === roomId)[0];
    }
}

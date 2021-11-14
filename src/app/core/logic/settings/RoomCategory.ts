export class RoomCategory {
    public id: number;
    public publicName: string;
    public needToBeStaff: boolean;

    constructor(id: number, publicName: string, needToBeStaff: boolean) {
        this.id = id;
        this.publicName = publicName;
        this.needToBeStaff = needToBeStaff;
    }
}

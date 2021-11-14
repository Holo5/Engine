export class Group {
    public id: number;
    public title: string;
    public isVisible: boolean;
    public typeId: number;
    public description: string;
    public badge: string;
    public roomId: number;
    public roomName: string;
    public membership: number;
    public memberSize: number;
    public createdAt: string;
    public isOwner: boolean;
    public isAdmin: boolean;
    public ownerId: number;
    public canMembersDecorate: boolean;
    public membershipRequestsSize: number;
    public hasForum: boolean;

    constructor(
        id: number,
        title: string,
        isVisible: boolean,
        typeId: number,
        description: string,
        badge: string,
        roomId: number,
        roomName: string,
        membership: number,
        memberSize: number,
        createdAt: string,
        isOwner: boolean,
        isAdmin: boolean,
        ownerId: number,
        canMembersDecorate: boolean,
        membershipRequestsSize: number,
        hasForum: boolean,
    ) {
        this.id = id;
        this.title = title;
        this.isVisible = isVisible;
        this.typeId = typeId;
        this.description = description;
        this.badge = badge;
        this.roomId = roomId;
        this.roomName = roomName;
        this.membership = membership;
        this.memberSize = memberSize;
        this.createdAt = createdAt;
        this.isOwner = isOwner;
        this.isAdmin = isAdmin;
        this.ownerId = ownerId;
        this.canMembersDecorate = canMembersDecorate;
        this.membershipRequestsSize = membershipRequestsSize;
        this.hasForum = hasForum;
    }
}

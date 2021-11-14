export class SettingsData {
    public id: number;
    public name: string;
    public description: string;
    public accessType: number;
    public categoryId: number;
    public usersMax: number;
    public usersMaxCeiling: number;
    public tagsLength: number;
    public tags: string[];
    public tradeState: number;
    public allowPets: boolean;
    public allowPetsEat: boolean;
    public allowWalkthrough: number;
    public hideWalls: number;
    public wallThickness: number;
    public floorThickness: number;
    public bubbleMode: number;
    public bubbleType: number;
    public bubbleScroll: number;
    public chatDistance: number;
    public antiFloodSettings: number;
    public muteState: number;
    public kickState: number;
    public banState: number;

    constructor(
        id: number,
        name: string,
        description: string,
        accessType: number,
        categoryId: number,
        usersMax: number,
        usersMaxCeiling: number,
        tagsLength: number,
        tags: string[],
        tradeState: number,
        allowPets: boolean,
        allowPetsEat: boolean,
        allowWalkthrough: number,
        hideWalls: number,
        wallThickness: number,
        floorThickness: number,
        bubbleMode: number,
        bubbleType: number,
        bubbleScroll: number,
        chatDistance: number,
        antiFloodSettings: number,
        muteState: number,
        kickState: number,
        banState: number,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.accessType = accessType;
        this.categoryId = categoryId;
        this.usersMax = usersMax;
        this.usersMaxCeiling = usersMaxCeiling;
        this.tagsLength = tagsLength;
        this.tags = tags;
        this.tradeState = tradeState;
        this.allowPets = allowPets;
        this.allowPetsEat = allowPetsEat;
        this.allowWalkthrough = allowWalkthrough;
        this.hideWalls = hideWalls;
        this.wallThickness = wallThickness;
        this.floorThickness = floorThickness;
        this.bubbleMode = bubbleMode;
        this.bubbleType = bubbleType;
        this.bubbleScroll = bubbleScroll;
        this.chatDistance = chatDistance;
        this.antiFloodSettings = antiFloodSettings;
        this.muteState = muteState;
        this.kickState = kickState;
        this.banState = banState;
    }
}

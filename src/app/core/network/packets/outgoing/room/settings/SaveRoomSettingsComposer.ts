import { Outgoing } from '../../Outgoing';
import { OutgoingPacket } from '../../OutgoingPacket';
import { OutgoingHeader } from '../../OutgoingHeader';

export class SaveRoomSettingsComposer extends Outgoing {
    private _id: number;
    private _name: string;
    private _description: string;
    private _accessType: number;
    private _password: string;
    private _usersMax: number;
    private _categoryId: number;

    private _tagsCount: number;
    private _tags: string[];

    private _tradeState: number;

    private _allowPets: boolean;
    private _allowPetsEat: boolean;

    private _allowWalkthrough: number;
    private _hideWall: number;
    private _wallThick: number;
    private _floorThick: number;

    private _muteState: number;
    private _kickState: number;
    private _banState: number;

    private _bubbleMode: number;
    private _bubbleType: number;
    private _bubbleScroll: number;
    private _chatDistance: number;
    private _antiFloodSettings: number;

    constructor(
        id: number,
        name: string,
        description: string,
        accessType: number,
        password: string,
        usersMax: number,
        categoryId: number,

        tagsCount: number,
        tags: string[],

        tradeState: number,

        allowPets: boolean,
        allowPetsEat: boolean,

        allowWalkthrough: number,
        hideWall: number,
        wallThick: number,
        floorThick: number,

        muteState: number,
        kickState: number,
        banState: number,

        bubbleMode: number,
        bubbleType: number,
        bubbleScroll: number,
        chatDistance: number,
        antiFloodSettings: number,
    ) {
        super(OutgoingHeader.SAVE_ROOM_SETTINGS_MESSAGE);

        this._id = id;
        this._name = name;
        this._description = description;
        this._accessType = typeof accessType !== 'number' ? parseInt(accessType) : accessType;
        this._password = password;
        this._usersMax = usersMax;
        this._categoryId = categoryId;

        this._tagsCount = tagsCount;
        this._tags = tags;

        this._tradeState = tradeState;

        this._allowPets = allowPets;
        this._allowPetsEat = allowPetsEat;

        this._allowWalkthrough = allowWalkthrough;
        this._hideWall = hideWall;
        this._wallThick = wallThick;
        this._floorThick = floorThick;

        this._muteState = muteState;
        this._kickState = kickState;
        this._banState = banState;

        this._bubbleMode = bubbleMode;
        this._bubbleType = bubbleType;
        this._bubbleScroll = bubbleScroll;
        this._chatDistance = chatDistance;
        this._antiFloodSettings = antiFloodSettings;
    }

    public compose(): OutgoingPacket {
        this.packet.writeInt(this._id);
        this.packet.writeString(this._name);
        this.packet.writeString(this._description);
        this.packet.writeInt(this._accessType);
        this.packet.writeString(this._password);
        this.packet.writeInt(this._usersMax);
        this.packet.writeInt(this._categoryId);

        this.packet.writeInt(this._tagsCount);

        if (this._tagsCount > 0) {
            for (let i = 0; i < this._tagsCount; i++) {
                this.packet.writeString(this._tags[i]);
            }
        }

        this.packet.writeInt(this._tradeState);

        this.packet.writeBoolean(this._allowPets);
        this.packet.writeBoolean(this._allowPetsEat);

        this.packet.writeBoolean(this._allowWalkthrough === 1);
        this.packet.writeBoolean(this._hideWall === 1);
        this.packet.writeInt(this._wallThick);
        this.packet.writeInt(this._floorThick);

        this.packet.writeInt(this._muteState);
        this.packet.writeInt(this._kickState);
        this.packet.writeInt(this._banState);

        this.packet.writeInt(this._bubbleMode);
        this.packet.writeInt(this._bubbleType);
        this.packet.writeInt(this._bubbleScroll);
        this.packet.writeInt(this._chatDistance);
        this.packet.writeInt(this._antiFloodSettings);

        return this.packet.prepare();
    }
}

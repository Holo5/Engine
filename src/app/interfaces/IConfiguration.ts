export interface IConfiguration {
    global: {
        hotelName: string,
        debug: boolean,
        targetInterface: string,
        externalText: string
    },
    network: {
        gameServerAddress: string
    },
    images: {
        imageDomain: string,
        furnitureDomain: string,
        figureDomain: string,
        iconsDomain: string,
        placeholderIconName: string,
        catalogDomain: string,
        groupDomain: string,
    },
    canvas: {
        stageContainer: string,
        maxFrameRate: number,
        minHoverableFloorDebounce: number
    },
    room: {
        tiles: {
            defaultMaterial: string,
            defaultThickness: number
        },
        walls: {
            defaultMaterial: string,
            defaultThickness: number
        }
    },
    chats: {
        bubbles: number[],
        minRankChatBubbles: number,
        whisperCommand: string,
    },
    console: {
        maxUsersDisplayedPerPage: number,
    },
}

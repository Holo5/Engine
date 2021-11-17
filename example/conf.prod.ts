import { IConfiguration } from '../src/interfaces/IConfiguration';

export const Configuration: IConfiguration = {
    global: {
        hotelName: 'HOLO5',
        targetInterface: '#game',
        debug: false,
        externalText: 'https://assets.holo5.co/city/external_flash_texts.txt',
    },
    network: {
        gameServerAddress: 'wss://holo.habbocity.me',
    },
    images: {
        imageDomain: 'https://assets.holo5.co/',
        badgeDomain: 'https://assets.holo5.co/badges/',
        furnitureDomain: 'https://assets.holo5.co/city/furni/',
        figureDomain: 'https://assets.holo5.co/city/figure/',
        iconsDomain: 'https://swf.habbocity.me/dcr/hof_furni/icons2/',
        placeholderIconName: 'PlaceHolderFurniture_icon.png',
        catalogDomain: 'https://swf.habbocity.me/c_images/catalogue/',
        groupDomain: 'https://swf.habbocity.me/habbo-imaging/badge-groupe/',
    },
    canvas: {
        stageContainer: 'canvas-zone',
        maxFrameRate: 60,
        hoverFrequency: 30,
    },
    room: {
        tiles: {
            defaultMaterial: '111',
            defaultThickness: 3,
        },
        walls: {
            defaultMaterial: '201',
            defaultThickness: 3,
        },
    },
    chats: {
        bubbles: [0, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 37],
        whisperCommand: ':chut',
        minRankChatBubbles: 5,
    },
    console: {
        maxUsersDisplayedPerPage: 50,
    },
};

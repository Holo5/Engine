import { IConfiguration } from '../src/interfaces/IConfiguration';

export const Configuration: IConfiguration = {
    global: {
        hotelName: 'HOLO5',
        targetInterface: '#game',
        debug: true,
        externalText: 'http://localhost:8082/city/external_flash_texts.txt',
    },
    network: {
        // gameServerAddress: 'ws://127.0.0.1:8999',
        gameServerAddress: 'wss://holo.habbocity.me',
    },
    images: {
        imageDomain: 'http://192.168.0.33:8082/',
        badgeDomain: 'http://192.168.0.33:8082/badges/',
        furnitureDomain: 'http://192.168.0.33:8082/city/furni/',
        figureDomain: 'http://192.168.0.33:8082/city/figure/',
        iconsDomain: 'https://swf.habbocity.me/dcr/hof_furni/icons2/',
        placeholderIconName: 'PlaceHolderFurniture_icon.png',
        catalogDomain: 'https://swf.habbocity.me/c_images/catalogue/',
        groupDomain: 'https://swf.habbocity.me/habbo-imaging/badge-groupe/',
    },
    canvas: {
        stageContainer: 'canvas-zone',
        maxFrameRate: 200,
        hoverFrequency: 30,
    },
    room: {
        tiles: {
            defaultMaterial: '111',
            defaultThickness: 1,
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

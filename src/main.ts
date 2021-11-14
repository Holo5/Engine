// import '@pixi/mixin-get-child-by-name';
// import { Engine } from './experiment/Engine';
// import { GraphicObject } from './experiment/GraphicObject';
// import { ItemObject } from './experiment/Item/ItemObject';
//
// const engine = new Engine();
//
// // setTimeout(() => {
// //     for (let i = 0; i < 100000; i++) {
// //         const graphicObject1 = new GraphicObject();
// //         engine.registerObject(graphicObject1);
// //     }
// // }, 500);
//
// setTimeout(() => {
//     for (let i = 0; i < 10000; i++) {
//         const egg = new ItemObject();
//
//         egg.updatePositions({ x: 0, y: 0, z: 0 }, { x: 40 + Math.random() * 1700 | 0, y: 50 + Math.random() * 1200 | 0, z: 0 });
//
//         egg.graphicObjects.forEach((o) => {
//             engine.registerObject(o);
//         });
//         // engine.registerObject(egg);
//     }
//
//     setTimeout(() => {
//         console.log(engine.stage.children.length);
//     }, 4000);
// }, 500);

import { Holo5 } from './app/Holo5';
import { HStore } from './app/store/Store';
import { Softy } from './app/game-interface/softy/Softy';
import { Core } from './app/core/Core';
import { Engine } from './app/core/graphic/engine/Engine';
import { Network } from './app/core/network/Network';
import { Logger } from './common/logger/Logger';
import { GraphicGuid } from './app/core/graphic/engine/utils/GraphicGuid';

if (localStorage.getItem('sess_id') === null) {
    localStorage.setItem('sess_id', GraphicGuid.create());
}

const holo5 = new Holo5(HStore, new Softy(), new Core(new Engine(), new Network()));

holo5.loadInterface().then(() => {
    Logger.info('Interface loaded ! :)');
});

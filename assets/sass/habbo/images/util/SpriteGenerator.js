var nsg = require('node-sprite-generator');
var path = require('path');

nsg({
    src: [
        path.resolve(__dirname, '..', 'sprite_icons') + '/*.png'
    ],
    spritePath: path.resolve(__dirname, '..', 'sprite_generated.png'),
    stylesheetPath: path.resolve(__dirname, '../', 'spritesheet_generated.scss'),
    compositor: 'jimp',
    layout: 'packed',
    stylesheet: path.resolve(__dirname, 'hab5.tpl')
}, function (err) {
    console.log('H5 sprites generated ! <3');
});
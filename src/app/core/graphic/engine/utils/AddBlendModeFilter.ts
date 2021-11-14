import { Filter } from 'pixi.js';

const fragment = `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

float fxaa(vec3 color1, vec3 color2) {
    return (abs(color1.x - color2.x) + abs(color1.y - color2.y) + abs(color1.z - color2.z)) / 3.0;
}

void main(void)
{
    vec3 color = vec3(1.0, 1.0, 1.0);
    vec4 textureColor = texture2D(uSampler, vTextureCoord);
    
    vec3 finalColor = color + vec3(textureColor.xyz);

    gl_FragColor = vec4(finalColor, fxaa(color, finalColor));
    gl_FragColor.rgb *= gl_FragColor.a * 0.5;
    
    if(finalColor == color) {
        gl_FragColor = vec4(0.0);
    }
}
`;

export class AddBlendModeFilter extends Filter {
    constructor() {
        super(undefined, fragment);
    }
}

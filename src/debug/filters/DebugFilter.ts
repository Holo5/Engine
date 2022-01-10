import { Filter } from 'pixi.js';
import { hex2rgb } from '@pixi/utils';

const fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 color;

void main(void)
{
   vec4 c = texture2D(uSampler, vTextureCoord);
   gl_FragColor = vec4(c.xyz, 1);
   
   if(c.a == 0.0) {
     gl_FragColor = vec4(color, 1);
   }
}
`;

export class DebugFilter extends Filter {

    constructor(color: number) {
        super(undefined, fragment);

        const arrayColor = new Float32Array(3);

        this.uniforms.color = hex2rgb(color, arrayColor);
    }
}
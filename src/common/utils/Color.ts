import * as PIXI from 'pixi.js';

export class Color {
    static hslToRgb(h: number, s: number, l: number): number[] {
        let r;
        let g;
        let
            b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = Color.hue2rgb(p, q, h + 1 / 3);
            g = Color.hue2rgb(p, q, h);
            b = Color.hue2rgb(p, q, h - 1 / 3);
        }

        return [r, g, b];
    }

    static hsl2hex(h: number, s: number, l: number) {
        const color = Color.hslToRgb(h, s, l);
        return PIXI.utils.rgb2hex(color);
    }

    static hue2rgb(p: number, q: number, t: number) {
        let t2 = t;
        if (t2 < 0) t2 += 1;
        if (t2 > 1) t2 -= 1;
        if (t2 < 1 / 6) return p + (q - p) * 6 * t2;
        if (t2 < 1 / 2) return q;
        if (t2 < 2 / 3) return p + (q - p) * (2 / 3 - t2) * 6;
        return p;
    }
}

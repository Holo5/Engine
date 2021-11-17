import { AvatarPart } from './AvatarPart';
import { Container } from 'pixi.js';

export class AvatarPartsContainer extends Container {
    readonly children: AvatarPart[];

    constructor() {
        super();

        this.sortableChildren = true;
    }
}

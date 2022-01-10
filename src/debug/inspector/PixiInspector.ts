import { Container } from 'pixi.js';
import { DebugFilter } from '../filters/DebugFilter';

export class PixiInspector {

    private container: Container;
    private mainBoxStyle: string;
    private mainList: HTMLElement;

    constructor(container: Container, styleOverride?: string) {
        this.container = container;

        this.mainBoxStyle = `
            background-color: rgba(0, 0, 0, 0.5); 
            color: white; 
            font-family: "Tahoma", sans-serif;
            font-size: 14px; 
            width: 400px;
            padding: 6px;
            border-radius: 5px;
            position: absolute; 
            z-index: 9999999; 
            top: 5; 
            left: 5;` + styleOverride;

        this.buildInterface();
    }

    private buildInterface() {
        const mainBox = document.createElement('div');
        mainBox.setAttribute('style', this.mainBoxStyle);

        this.mainList = document.createElement('div');
        this.mainList.setAttribute('style', 'height: 500px; background-color: rgba(0, 0, 0, 0.3); border-radius: 5px; display: flex; flex-direction: column; overflow: auto;');

        const mainButtonBox = document.createElement('div');
        mainButtonBox.setAttribute('style', 'margin-top: 5px;');

        const refreshButton = document.createElement('button');
        refreshButton.innerText = 'Refresh';
        refreshButton.onclick = this.refresh.bind(this);

        const searchBox = document.createElement('input');
        searchBox.placeholder = 'Search...';

        searchBox.onkeyup = () => {
            console.log('Search !', searchBox.value);
        };

        mainBox.appendChild(this.mainList);
        mainButtonBox.appendChild(refreshButton);
        mainButtonBox.appendChild(searchBox);
        mainBox.appendChild(mainButtonBox);

        document.body.appendChild(mainBox);
    }

    public refresh() {
        this.mainList.innerHTML = '';

        this.container.children.forEach(child => {
            let listElement = this.createListElement(`${child.constructor.name} (${child.name})`);
            this.mainList.appendChild(listElement);

            listElement.onclick = () => {
                child.filters = [
                    new DebugFilter(0x990012),
                ];
            };

            listElement.onmouseenter = () => {
                child.position.y -= 50;
            };

            listElement.onmouseleave = () => {
                child.position.y += 50;
            };
        });
    }

    private createListElement(text: string) {
        const listElement = document.createElement('div');
        listElement.innerText = text;
        listElement.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.6); margin: 3px; padding: 5px; border-radius: 5px; cursor: pointer;');

        return listElement;
    }
}
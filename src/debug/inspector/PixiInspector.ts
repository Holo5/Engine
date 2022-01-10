import { Container } from 'pixi.js';

export class PixiInspector {

    private container: Container;
    private mainBoxStyle: string;

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

        const mainList = document.createElement('div');
        mainList.setAttribute('style', 'height: 500px; background-color: rgba(0, 0, 0, 0.3); border-radius: 5px;');

        const mainButtonBox = document.createElement('div');
        mainButtonBox.setAttribute('style', 'margin-top: 5px;');

        const refreshButton = document.createElement('button');
        refreshButton.innerText = 'Refresh';

        mainBox.appendChild(mainList);
        mainButtonBox.appendChild(refreshButton);
        mainBox.appendChild(mainButtonBox);

        document.body.appendChild(mainBox);
    }
}
import { Container } from 'pixi.js';

export class PixiInspector {

    private container: Container;
    private mainBoxStyle: string;

    constructor(container: Container, styleOverride?: string) {
        this.container = container;

        this.mainBoxStyle = `
            background-color: rgba(0, 0, 0, 0.7); 
            color: white; 
            font-family: "Tahoma", sans-serif;
            font-size: 14px; 
            width: 300px; 
            height: 400px; 
            position: absolute; 
            z-index: 9999999; 
            top: 0; 
            left: 0;` + styleOverride;

        this.buildInterface();
    }

    private buildInterface() {
        const mainBox = document.createElement('div');
        mainBox.setAttribute('style', this.mainBoxStyle);



        document.body.appendChild(mainBox);
    }
}
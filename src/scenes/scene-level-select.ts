import { Application } from 'pixi.js';
import ButtonLevel from '../components/level-select/button-level';
import BaseScene from './base-scene'

export default class SceneLevelSelect extends BaseScene {
    public onStackChoosenEvent: string;
    public onTextGenChoosenEvent: string;
    public onFireDemoChoosenEvent: string;

    private stackButton: ButtonLevel;
    private textGeneratorButton: ButtonLevel;
    private fireDemoButton: ButtonLevel;

    constructor(app: Application) {
        super(app);

        this.onStackChoosenEvent = 'onStackChoosen';
        this.onTextGenChoosenEvent = 'onTextGenChoosen';
        this.onFireDemoChoosenEvent = 'onFireDemoChoosen';

        this.stackButton = null;
        this.textGeneratorButton = null;
        this.fireDemoButton = null;

        this.initRedirectButtons();
    }

    private initRedirectButtons(): void {
        this.stackButton = this.initStackButton();
        this.textGeneratorButton = this.initTextGeneratorButton();
        this.fireDemoButton = this.initFireDemoButton();
    }

    private initStackButton(): ButtonLevel {
        const stackButton = new ButtonLevel("STACK SCENE");
        this.addChild(stackButton);

        stackButton.on('pointerdown', () => {
            this.emit(this.onStackChoosenEvent);
        });

        return stackButton;
    }

    private initTextGeneratorButton(): ButtonLevel {
        const textGeneratorButton = new ButtonLevel("TEXT GENERATOR");
        this.addChild(textGeneratorButton);

        textGeneratorButton.on('pointerdown', () => {
            this.emit(this.onTextGenChoosenEvent);
        });

        return textGeneratorButton;
    }

    private initFireDemoButton(): ButtonLevel {
        const fireDemoButton = new ButtonLevel("FIRE DEMO");
        this.addChild(fireDemoButton);

        fireDemoButton.on('pointerdown', () => {
            this.emit(this.onFireDemoChoosenEvent);
        });

        return fireDemoButton;
    }

    protected resize(): void {
        this.stackButton.y = -85;
        this.fireDemoButton.y = 85;
    }
}

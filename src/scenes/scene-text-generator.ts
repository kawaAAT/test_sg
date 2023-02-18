import { Application } from 'pixi.js';
import Randomizer from '../components/level-text-generator/randomizer';
import BaseScene from './base-scene'

export default class SceneTextGenerator extends BaseScene {
    private timer: ReturnType<typeof setTimeout> | null = null;
    private randomizer: Randomizer;

    constructor(app: Application) {
        super(app);

        this.interactiveChildren = false;

        this.randomizer = new Randomizer();
        this.addChild(this.randomizer);
    }

    public show(): void {
        super.show();

        if (this.timer === null) {
            this.timer = setInterval(() => this.randomizeResult(), DELAY);
            this.randomizeResult()
        }
    }

    public hide(): void {
        super.hide();

        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    private randomizeResult(): void {
        this.randomizer.randomize();
        this.resize();
    }

    protected resize(): void {
        this.scale.set(1);
        if (this.width > this.app.view.width) {
            const newScale = this.app.view.width / this.width * 0.8;
            this.scale.set(newScale);
        }
    }
}

const DELAY = 2000;
import { Application } from 'pixi.js';
import Card from '../components/stacks/card';
import CardsStack from '../components/stacks/cards-stack';
import BaseScene from './base-scene'

export default class SceneStacks extends BaseScene {
    private stackLeft: CardsStack = null;
    private stackRight: CardsStack = null;
    private timer: ReturnType<typeof setTimeout> | null = null;;

    constructor(app: Application) {
        super(app);

        this.initStacks();
        this.fillStack(this.stackLeft);

        this.interactiveChildren = false;
    }

    public show(): void {
        super.show();

        if (this.timer === null) {
            this.timer = setInterval(() => this.moveCard(), MOVE_DELAY);
        }
    }

    public hide(): void {
        super.hide();

        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    private initStacks(): void {
        this.stackLeft = new CardsStack();
        this.addChild(this.stackLeft);

        this.stackRight = new CardsStack();
        this.addChild(this.stackRight);
    }

    private fillStack(stack: CardsStack): void {
        for (let i = 0; i < CARDS_AMOUNT; i++) {
            const card = new Card();
            stack.addCard(card);
        }
    }

    private moveCard(): void {
        if (this.stackLeft.hasCards) {
            this.stackLeft.moveCardToStack(this.stackRight);
        }
    }

    protected resize(): void {
        this.stackLeft.x = -85;
        this.stackLeft.y = -150;

        this.stackRight.x = 85;
        this.stackRight.y = -150;

        this.scale.set(1);
        if (this.height > this.app.view.height) {
            const newScale = this.app.view.height / this.height * 0.8;
            this.scale.set(newScale);
        }
    }
}

const CARDS_AMOUNT = 144;
const MOVE_DELAY = 1000;
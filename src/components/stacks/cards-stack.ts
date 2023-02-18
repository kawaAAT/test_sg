import { Container, Point } from 'pixi.js';
import Card from './card';
import { Tween, Easing, Interpolation } from '@tweenjs/tween.js';

export default class CardsStack extends Container {

  // default array with push(), pop() methods is great for stack implementation
  private stack: Card[];

  // to not create a new point for local transformation on each card move
  private cachedPoint: Point = new Point(0, 0);

  constructor() {
    super();

    this.stack = [];
    this.interactiveChildren = false;
  }

  public addCard(card: Card) {
    this.addChild(card);
    this.stack.push(card);

    card.y = this.stack.length * CARDS_OFFSET;
  }

  public moveCardToStack(stack: CardsStack) {
    const card = this.stack.pop();

    // we save local position of the card relative to the new stack
    const localPosition = card.toLocal(this.cachedPoint, stack);

    stack.addCard(card);
    // we save final position in the new stack
    const finalPosition = new Point(card.x, card.y);

    // set position as it was in the old stack to start animation from here
    card.x = -localPosition.x;
    card.y = -localPosition.y;

    new Tween(card)
      .to({
        x: [100, 10, finalPosition.x],
        y: finalPosition.y,
        angle: 180
      }, MOVE_TIME)
      .easing(Easing.Sinusoidal.Out)
      .interpolation(Interpolation.Bezier)
      .start();
  }

  public get hasCards(): boolean {
    return this.stack.length > 0;
  }
}

const CARDS_OFFSET = 1.8;
const MOVE_TIME = 2000;
import { Container } from 'pixi.js';
import Utils from '../utils';
import RandomSprite from './random-sprite';
import RandomText from './random-text';

export default class Randomizer extends Container {
  private spritesPool: RandomSprite[] = [];
  private textsPool: RandomText[] = [];

  constructor() {
    super();

    this.initPools();
  }

  public randomize(): void {
    this.children.forEach(child => child.visible = false);

    const shuffledElements = Utils.shuffle([...this.spritesPool, ...this.textsPool]);

    let prevOffset = 0;
    let totalLength = 0;
    for (let i = 0; i < PARTS_AMOUNT; i++) {
        const element = shuffledElements[i];
        element.visible = true;
        element.x = prevOffset;
        element.randomize();

        prevOffset = element.x + element.width;
        totalLength += element.width;
    }   

    this.pivot.x = totalLength / 2;
  }

  private initPools(): void {
    for (let i = 0; i < PARTS_AMOUNT; i++) {
      const sprite = new RandomSprite();
      this.addChild(sprite);
      this.spritesPool.push(sprite);

      const text = new RandomText();
      this.addChild(text);
      this.textsPool.push(text);
    }
  }
}

const PARTS_AMOUNT = 3;

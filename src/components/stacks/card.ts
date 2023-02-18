import {  Sprite } from 'pixi.js';
import TexturesCache from '../../kernel/textures-cache';

export default class Card extends Sprite {
  constructor() {
    const texture = TexturesCache.get('card.png');
    super(texture);

    this.anchor.set(0.5);
  }
}
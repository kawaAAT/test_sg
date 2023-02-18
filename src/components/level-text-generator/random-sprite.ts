import { Sprite } from 'pixi.js';
import TexturesCache from '../../kernel/textures-cache';

export default class RandomSprite extends Sprite {
  private spritesNames: string[] = [
    'emoji1.png', 
    'emoji2.png', 
    'emoji3.png', 
    'emoji4.png', 
    'emoji5.png', 
    'emoji6.png'
  ];

  constructor() {
    super();
    
    this.visible = false;
    this.scale.set(0.5);
  }

  randomize() {
    const textureName = this.spritesNames[Math.floor(Math.random() * this.spritesNames.length)];
    this.texture = TexturesCache.get(textureName);

    this.anchor.set(0, 0.5);
  }
}

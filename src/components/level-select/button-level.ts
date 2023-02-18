import { Container, Text, Sprite, TextStyle } from 'pixi.js';
import TexturesCache from '../../kernel/textures-cache';

export default class ButtonLevel extends Container {
  private text: string;

  constructor(text: string) {
    super();

    this.text = text;
    this.interactive = true;

    this.initBg();
    this.initTextField();

    this.on('pointerover', this.onButtonOver, this);
  }

  private initBg(): void {
    const bgTexture = TexturesCache.get('button.png');

    const bg = new Sprite(bgTexture);
    bg.anchor.set(0.5, 0.5);
    bg.scale.set(0.45);
    this.addChild(bg);
  }

  private initTextField(): void {
    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 25,
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'],
      dropShadow: true,
      dropShadowAngle: 0.3,
      dropShadowDistance: 2
    });

    const textField = new Text(this.text, style);
    textField.anchor.set(0.5);
    this.addChild(textField);
  }

  private onButtonOver(): void {
    this.cursor = 'pointer';
  }
}
import { Text } from 'pixi.js';
import Utils from '../utils';

export default class RandomText extends Text {
  private textSamples: string[] = [
    'wow!',
    'WoW',
    '1000$',
    'no way',
    'random',
    'Go_hErE',
    'NICE',
    'retry...',
    '#1455',
    '982',
    '515',
    'xxx.xx',
    'AbcD'
  ];

  constructor() {
    super('');

    this.visible = false;
  }

  public randomize(): void {
    this.text = this.textSamples[Math.floor(Math.random() * this.textSamples.length)];
    this.style.fontSize = Math.floor(30 + Math.random() * 30);
    this.style.fill = Utils.getRandomHex();

    this.anchor.set(0, 0.5);
  }
}
